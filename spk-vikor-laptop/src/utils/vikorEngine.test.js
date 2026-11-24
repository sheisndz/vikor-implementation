import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { calculateVikor } from './vikorEngine.js';
import { formatRupiah, getPriceScore, getNextLaptopCode } from './formatters.js';

const SAMPLE_CRITERIA = [
  { id: 'C1', name: 'Harga', type: 'cost', weight: 0.5 },
  { id: 'C2', name: 'CPU', type: 'benefit', weight: 0.5 }
];

const SAMPLE_ALTERNATIVES = [
  { id: '1', code: 'A1', name: 'Laptop Murah Kencang', values: { C1: 1, C2: 5 } },
  { id: '2', code: 'A2', name: 'Laptop Sedang', values: { C1: 3, C2: 3 } },
  { id: '3', code: 'A3', name: 'Laptop Mahal Pelan', values: { C1: 5, C2: 1 } }
];

describe('vikorEngine', () => {
  it('mengembalikan error jika alternatif kurang dari 2', () => {
    const result = calculateVikor([SAMPLE_ALTERNATIVES[0]], SAMPLE_CRITERIA);
    assert.ok(result.error);
    assert.deepEqual(result.ranked, []);
  });

  it('meranking alternatif ideal di peringkat #1 dengan Q = 0 dan solusi tunggal', () => {
    const result = calculateVikor(SAMPLE_ALTERNATIVES, SAMPLE_CRITERIA, { C1: 5, C2: 5 }, 0.5);
    assert.equal(result.ranked[0].code, 'A1');
    assert.equal(result.ranked[0].Q, 0);
    assert.equal(result.ranked[2].code, 'A3');
    assert.equal(result.ranked[2].Q, 1);
    assert.equal(result.compromiseStatus, 'SOLUSI_TERBAIK_TUNGGAL');
    assert.equal(result.condition1Passed, true);
    assert.equal(result.condition2Passed, true);
  });

  it('aman dari pembagian nol jika semua skor kriteria identik', () => {
    const identical = [
      { id: '1', code: 'A1', name: 'Sama 1', values: { C1: 3, C2: 3 } },
      { id: '2', code: 'A2', name: 'Sama 2', values: { C1: 3, C2: 3 } }
    ];
    const result = calculateVikor(identical, SAMPLE_CRITERIA, { C1: 1, C2: 1 }, 0.5);
    assert.equal(Number.isNaN(result.ranked[0].Q), false);
    assert.equal(result.ranked[0].Q, 0);
  });
});

describe('formatters', () => {
  it('memformat Rupiah dengan benar', () => {
    assert.match(formatRupiah(12999000), /12\.999\.000/);
  });

  it('mengonversi harga ke skor C1 sesuai rubrik', () => {
    assert.equal(getPriceScore(6500000), 1);
    assert.equal(getPriceScore(10000000), 2);
    assert.equal(getPriceScore(12999000), 3);
    assert.equal(getPriceScore(18000000), 4);
    assert.equal(getPriceScore(25000000), 5);
  });

  it('menghasilkan kode laptop berikutnya tanpa duplikat meski ada item terhapus', () => {
    const list = [{ code: 'A2' }, { code: 'A20' }];
    assert.equal(getNextLaptopCode(list), 'A21');
  });
});
