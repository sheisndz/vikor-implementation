import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Check, X, Sparkles, BookOpen } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export default function VikorStepsTable({ vikorResult, criteria }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ranking');

  const rankedMap = useMemo(() => {
    const map = new Map();
    if (vikorResult?.ranked) {
      vikorResult.ranked.forEach((r) => map.set(r.id, r));
    }
    return map;
  }, [vikorResult]);

  if (!vikorResult || !vikorResult.ranked || vikorResult.ranked.length === 0) {
    return null;
  }

  const {
    ranked,
    fStar,
    fMinus,
    weights,
    sStar,
    rStar,
    v,
    DQ,
    diffQ,
    condition1Passed,
    condition2Passed,
    compromiseDescription,
    normalizedMatrix
  } = vikorResult;

  const tabs = [
    { id: 'ranking', label: '1. Peringkat (S, R, Q)' },
    { id: 'matrix', label: '2. Matriks (X)' },
    { id: 'ideal', label: '3. Ideal (f* & f-)' },
    { id: 'weighted', label: '4. Jarak (rij)' },
    { id: 'compromise', label: '5. Evaluasi Kompromi' }
  ];

  return (
    <div
      data-aos="fade-up"
      className="bg-white rounded-3xl border border-[#F3D5E3] shadow-pastel overflow-hidden transition-colors hover:border-[#FA80B1]/60"
    >
      {/* Accordion Trigger Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-3 text-left hover:bg-[#FFF8F3] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-[#E4BDFE]/55 text-[#3A2334] flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-sm sm:text-base font-bold text-[#3A2334] truncate">
              Transparansi Perhitungan VIKOR
            </h3>
            <p className="text-[11px] text-[#7D5D73] truncate">
              Matriks keputusan, bobot Wj, S, R, Q, dan pembuktian syarat kompromi
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-block text-[11px] font-heading font-bold text-[#3A2334] bg-[#FEC5E7] px-3 py-1 rounded-full">
            {isOpen ? 'Tutup Detail' : 'Buka Detail'}
          </span>
          <span className="w-8 h-8 rounded-full bg-[#FDE2E4] flex items-center justify-center text-[#3A2334]">
            {isOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </span>
        </div>
      </button>

      {/* Accordion Content Body */}
      {isOpen && (
        <div className="border-t border-[#FDE2E4] p-5 space-y-4 bg-[#FFF8F3]/70">
          {/* Sub-Tabs Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#FA80B1] text-white font-bold shadow-xs'
                    : 'bg-white text-[#7D5D73] border border-[#F3D5E3] hover:text-[#3A2334] hover:border-[#FA80B1]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Tabel Peringkat Lengkap (S, R, Q) */}
          {activeTab === 'ranking' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#7D5D73]">
                <span>
                  Total <strong className="text-[#3A2334]">{ranked.length} alternatif</strong> dengan parameter strategi <strong className="text-[#FA80B1]">v = {v}</strong>
                </span>
                <span className="text-[11px] font-mono text-[#7D5D73]">
                  S* = {sStar.toFixed(4)} | R* = {rStar.toFixed(4)}
                </span>
              </div>

              <div className="overflow-x-auto bg-white rounded-2xl border border-[#F3D5E3]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FDE2E4]/65 text-[#3A2334] font-heading border-b border-[#F3D5E3] text-[11px]">
                    <tr>
                      <th className="py-3 px-3 text-center w-12">Rank</th>
                      <th className="py-3 px-3 text-center w-14">Kode</th>
                      <th className="py-3 px-4">Nama Alternatif Laptop</th>
                      <th className="py-3 px-3 text-right">Harga</th>
                      <th className="py-3 px-3 text-center font-mono">S</th>
                      <th className="py-3 px-3 text-center font-mono">R</th>
                      <th className="py-3 px-3 text-center font-mono bg-[#FEC5E7]/65 text-[#3A2334] font-bold">
                        Indeks (Q)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FDE2E4]/60">
                    {ranked.map((alt) => (
                      <tr
                        key={alt.id}
                        className={`hover:bg-[#FFF8F3] transition-colors ${
                          alt.rank === 1 ? 'bg-[#FFF1E6]/75' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`inline-block w-5 h-5 rounded-full text-[10px] leading-5 font-heading font-bold ${
                              alt.rank === 1
                                ? 'bg-[#FA80B1] text-white'
                                : alt.rank === 2
                                ? 'bg-[#FEC5E7] text-[#3A2334]'
                                : alt.rank === 3
                                ? 'bg-[#E4BDFE] text-[#3A2334]'
                                : 'text-[#7D5D73]'
                            }`}
                          >
                            {alt.rank}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-[#FA80B1]">
                          {alt.code}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-[#3A2334]">
                          {alt.name}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-[#7D5D73]">
                          {formatRupiah(alt.price)}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-[#3A2334]">
                          {alt.S.toFixed(5)}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-[#3A2334]">
                          {alt.R.toFixed(5)}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-[#3A2334] bg-[#FEC5E7]/30">
                          {alt.Q.toFixed(5)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Matriks Keputusan (X) */}
          {activeTab === 'matrix' && (
            <div className="space-y-3">
              <p className="text-xs text-[#7D5D73]">
                Nilai skor mentah kriteria (C1–C8) berdasarkan rubrik konversi skala 1–5:
              </p>
              <div className="overflow-x-auto bg-white rounded-2xl border border-[#F3D5E3]">
                <table className="w-full text-xs text-center">
                  <thead className="bg-[#FDE2E4]/65 text-[#3A2334] font-heading border-b border-[#F3D5E3] text-[11px]">
                    <tr>
                      <th className="py-3 px-3 text-left">Kode & Nama</th>
                      {criteria.map((c) => (
                        <th key={c.id} className="py-3 px-2.5">
                          <div>{c.id}</div>
                          <div className="text-[9px] font-normal text-[#7D5D73]">{c.type.toUpperCase()}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FDE2E4]/60">
                    {ranked.map((alt) => (
                      <tr key={alt.id} className="hover:bg-[#FFF8F3]">
                        <td className="py-2.5 px-3 text-left font-medium text-[#3A2334] whitespace-nowrap">
                          <span className="font-mono font-bold text-[#FA80B1] mr-2">{alt.code}</span>
                          {alt.name}
                        </td>
                        {criteria.map((c) => (
                          <td key={c.id} className="py-2.5 px-2.5 font-mono text-[#3A2334]">
                            {alt.values[c.id]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Nilai Ideal (f* & f-) */}
          {activeTab === 'ideal' && (
            <div className="space-y-3">
              <p className="text-xs text-[#7D5D73]">
                Solusi ideal positif (f*) dan negatif (f-) untuk setiap kriteria:
              </p>
              <div className="overflow-x-auto bg-white rounded-2xl border border-[#F3D5E3]">
                <table className="w-full text-xs text-center font-mono">
                  <thead className="bg-[#FDE2E4]/65 text-[#3A2334] font-heading border-b border-[#F3D5E3] text-[11px]">
                    <tr>
                      <th className="py-3 px-3 text-left">Parameter Ideal</th>
                      {criteria.map((c) => (
                        <th key={c.id} className="py-3 px-3">
                          <div>{c.id}</div>
                          <div className="text-[9px] text-[#7D5D73] font-body font-normal">{c.name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FDE2E4]/60 font-bold">
                    <tr className="bg-[#E4BDFE]/35">
                      <td className="py-3 px-3 text-left text-[#3A2334] font-heading">
                        Nilai Terbaik (f* / fj+)
                      </td>
                      {criteria.map((c) => (
                        <td key={c.id} className="py-3 px-3 text-[#3A2334] text-sm">
                          {fStar[c.id]}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-[#FEC5E7]/45">
                      <td className="py-3 px-3 text-left text-[#3A2334] font-heading">
                        Nilai Terburuk (f- / fj-)
                      </td>
                      {criteria.map((c) => (
                        <td key={c.id} className="py-3 px-3 text-[#3A2334] text-sm">
                          {fMinus[c.id]}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-[#FFF1E6]">
                      <td className="py-3 px-3 text-left text-[#3A2334] font-heading">
                        Bobot Normalisasi (Wj)
                      </td>
                      {criteria.map((c) => (
                        <td key={c.id} className="py-3 px-3 text-[#3A2334] text-xs">
                          {weights[c.id]?.toFixed(4)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Matriks Jarak Terbobot (rij) */}
          {activeTab === 'weighted' && (
            <div className="space-y-3">
              <p className="text-xs text-[#7D5D73]">
                Matriks jarak normalisasi dikalikan bobot kriteria (rij = Wj * dij):
              </p>
              <div className="overflow-x-auto bg-white rounded-2xl border border-[#F3D5E3]">
                <table className="w-full text-xs text-center font-mono">
                  <thead className="bg-[#FDE2E4]/65 text-[#3A2334] font-heading border-b border-[#F3D5E3] text-[11px]">
                    <tr>
                      <th className="py-3 px-3 text-left">Kode & Nama</th>
                      {criteria.map((c) => (
                        <th key={c.id} className="py-3 px-2.5">
                          {c.id}
                        </th>
                      ))}
                      <th className="py-3 px-3 text-center bg-[#FFF1E6] text-[#3A2334]">S = Σ rij</th>
                      <th className="py-3 px-3 text-center bg-[#E4BDFE]/60 text-[#3A2334]">R = Max rij</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FDE2E4]/60">
                    {normalizedMatrix.map((item) => {
                      const matched = rankedMap.get(item.id);
                      return (
                        <tr key={item.id} className="hover:bg-[#FFF8F3]">
                          <td className="py-2.5 px-3 text-left font-body font-medium text-[#3A2334] whitespace-nowrap">
                            <span className="font-mono font-bold text-[#FA80B1] mr-2">{item.code}</span>
                            {item.name}
                          </td>
                          {criteria.map((c) => (
                            <td key={c.id} className="py-2.5 px-2.5 text-[#7D5D73] text-[11px]">
                              {item.distances[c.id]?.toFixed(4)}
                            </td>
                          ))}
                          <td className="py-2.5 px-3 font-bold text-[#3A2334] bg-[#FFF1E6]/60">
                            {matched?.S.toFixed(5)}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-[#3A2334] bg-[#E4BDFE]/30">
                            {matched?.R.toFixed(5)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: Pengujian Syarat Kompromi */}
          {activeTab === 'compromise' && (
            <div className="bg-white p-5 rounded-2xl border border-[#F3D5E3] space-y-4 text-xs">
              <div className="border-b border-[#FDE2E4] pb-3">
                <h4 className="font-heading text-[#3A2334] text-sm sm:text-base font-bold">
                  Evaluasi 2 Syarat Solusi Kompromi VIKOR
                </h4>
                <p className="text-[#7D5D73] text-xs mt-0.5">
                  Validasi ilmiah apakah Peringkat #1 ({ranked[0]?.name}) layak menjadi pemenang mutlak tunggal.
                </p>
              </div>

              {/* Syarat 1 */}
              <div className="p-4 rounded-2xl bg-[#FFF8F3] border border-[#F3D5E3] space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1 rounded-full ${
                        condition1Passed
                          ? 'bg-[#E4BDFE] text-[#3A2334]'
                          : 'bg-[#FA80B1] text-white'
                      }`}
                    >
                      {condition1Passed ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </div>
                    <span className="font-heading font-bold text-xs text-[#3A2334]">
                      Syarat 1: Acceptable Advantage
                    </span>
                  </div>
                  <span
                    className={`font-heading px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      condition1Passed
                        ? 'bg-[#E4BDFE]/60 text-[#3A2334]'
                        : 'bg-[#FEC5E7] text-[#3A2334]'
                    }`}
                  >
                    {condition1Passed ? 'MEMENUHI (PASS)' : 'TIDAK MEMENUHI'}
                  </span>
                </div>

                <div className="font-mono text-xs bg-white p-3 rounded-xl border border-[#FDE2E4] space-y-1 text-[#3A2334]">
                  <div>
                    Ambang Batas: DQ = 1 / (m - 1) = 1 / ({ranked.length} - 1) = <strong className="text-[#FA80B1]">{DQ.toFixed(4)}</strong>
                  </div>
                  <div>
                    Selisih Nilai Q: Q(A2) - Q(A1) = {ranked[1]?.Q.toFixed(4)} - {ranked[0]?.Q.toFixed(4)} = <strong className="text-[#FA80B1]">{diffQ.toFixed(4)}</strong>
                  </div>
                  <div className="text-[11px] font-body font-semibold text-[#7D5D73] mt-1">
                    Evaluasi: <strong className="text-[#3A2334]">{diffQ.toFixed(4)} {condition1Passed ? '≥' : '<'} {DQ.toFixed(4)}</strong>
                  </div>
                </div>
              </div>

              {/* Syarat 2 */}
              <div className="p-4 rounded-2xl bg-[#FFF8F3] border border-[#F3D5E3] space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1 rounded-full ${
                        condition2Passed
                          ? 'bg-[#E4BDFE] text-[#3A2334]'
                          : 'bg-[#FA80B1] text-white'
                      }`}
                    >
                      {condition2Passed ? (
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      ) : (
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </div>
                    <span className="font-heading font-bold text-xs text-[#3A2334]">
                      Syarat 2: Acceptable Stability
                    </span>
                  </div>
                  <span
                    className={`font-heading px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      condition2Passed
                        ? 'bg-[#E4BDFE]/60 text-[#3A2334]'
                        : 'bg-[#FEC5E7] text-[#3A2334]'
                    }`}
                  >
                    {condition2Passed ? 'MEMENUHI (PASS)' : 'TIDAK MEMENUHI'}
                  </span>
                </div>

                <div className="text-[#7D5D73] text-xs bg-white p-3 rounded-xl border border-[#FDE2E4] leading-relaxed">
                  {condition2Passed ? (
                    <>
                      Alternatif <strong className="text-[#3A2334]">{ranked[0]?.name}</strong> juga terbukti menjadi yang terbaik pada nilai Utilitas S (S = {ranked[0]?.S.toFixed(4)}, S* = {sStar.toFixed(4)}) atau nilai Regret R (R = {ranked[0]?.R.toFixed(4)}, R* = {rStar.toFixed(4)}).
                    </>
                  ) : (
                    <>
                      Alternatif <strong className="text-[#3A2334]">{ranked[0]?.name}</strong> belum menjadi yang terbaik pada nilai Utilitas S (S = {ranked[0]?.S.toFixed(4)} vs S* = {sStar.toFixed(4)}) maupun nilai Regret R (R = {ranked[0]?.R.toFixed(4)} vs R* = {rStar.toFixed(4)}).
                    </>
                  )}
                </div>
              </div>

              {/* Kesimpulan */}
              <div className="p-4 bg-[#FDE2E4]/70 border border-[#FEC5E7] rounded-2xl text-[#3A2334] text-xs space-y-1">
                <div className="font-heading font-bold text-[#3A2334] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FA80B1]" />
                  Kesimpulan Status Kompromi
                </div>
                <p className="text-[#7D5D73] leading-relaxed">
                  {compromiseDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
