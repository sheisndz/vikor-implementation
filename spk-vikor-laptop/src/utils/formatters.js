const rupiahFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

/**
 * Format angka ke format mata uang Rupiah (IDR).
 * @param {number} value
 * @returns {string}
 */
export function formatRupiah(value) {
  return rupiahFormatter.format(Number(value) || 0);
}

/**
 * Konversi harga (Rp) ke skor rubrik C1 (1 = <=7jt ... 5 = >20jt).
 * @param {number} price
 * @returns {number}
 */
export function getPriceScore(price) {
  const p = Number(price) || 0;
  if (p <= 7000000) return 1;
  if (p <= 10000000) return 2;
  if (p <= 15000000) return 3;
  if (p <= 20000000) return 4;
  return 5;
}

/**
 * Menghasilkan kode alternatif berikutnya yang dijamin unik (misal A21).
 * @param {Array} laptops
 * @returns {string}
 */
export function getNextLaptopCode(laptops = []) {
  const maxNumber = laptops.reduce((max, item) => {
    const match = String(item.code || '').match(/^A(\d+)$/i);
    if (!match) return max;
    return Math.max(max, Number(match[1]));
  }, 0);
  return `A${maxNumber + 1}`;
}
