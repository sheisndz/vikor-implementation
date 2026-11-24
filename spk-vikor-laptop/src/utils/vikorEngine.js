// src/utils/vikorEngine.js

// Mesin Perhitungan Metode VIKOR (VlseKriterijumska Optimizacija I Kompromisno Resenje)


/**
 * Menghitung peringkat VIKOR untuk daftar alternatif laptop.
 * @param {Array} alternatives - Daftar laptop (A1 - An)
 * @param {Array} criteria - Definisi kriteria (C1 - Cn)
 * @param {Object} rawWeights - Nilai bobot/slider { C1: 4, C2: 5, ... } atau bobot langsung
 * @param {number} v - Bobot strategi maksimal utility / mayoritas kriteria (default: 0.5)
 * @returns {Object} Hasil perhitungan lengkap (f*, f-, S, R, Q, ranking, dan status kompromi)
 */

export function calculateVikor(alternatives, criteria, rawWeights = {}, v = 0.5) {
  if (!alternatives || alternatives.length < 2) {
    return {
      error: "Jumlah alternatif minimal 2 untuk menghitung metode VIKOR.",
      ranked: []
    };
  }

  const m = alternatives.length; // Jumlah alternatif (J)
  const n = criteria.length;     // Jumlah kriteria

  // 1. Normalisasi Bobot Kriteria (Wj)
  // Menghitung total rating dari input pengguna atau bobot default
  let totalRawWeight = 0;
  criteria.forEach((c) => {
    const val = rawWeights[c.id] ?? c.weight ?? 1;
    totalRawWeight += Number(val);
  });

  const weights = {};
  criteria.forEach((c) => {
    const val = rawWeights[c.id] ?? c.weight ?? 1;
    weights[c.id] = totalRawWeight > 0 ? Number(val) / totalRawWeight : 1 / n;
  });

  // 2. Menentukan Nilai Terbaik (f*) dan Terburuk (f-) untuk Setiap Kriteria
  const fStar = {};
  const fMinus = {};

  criteria.forEach((c) => {
    const scores = alternatives.map((alt) => Number(alt.values[c.id]));
    const maxVal = Math.max(...scores);
    const minVal = Math.min(...scores);

    if (c.type === "cost") {
      // Untuk kriteria COST (seperti Harga): nilai terkecil adalah terbaik
      fStar[c.id] = minVal;
      fMinus[c.id] = maxVal;
    } else {
      // Untuk kriteria BENEFIT: nilai terbesar adalah terbaik
      fStar[c.id] = maxVal;
      fMinus[c.id] = minVal;
    }
  });

  // 3. Menghitung Matriks Normalisasi Terbobot (rij), Nilai Utilitas (S), dan Nilai Regret (R)
  const normalizedMatrix = [];
  const results = alternatives.map((alt) => {
    let sSum = 0;
    const rValues = [];
    const altDistances = {};

    criteria.forEach((c) => {
      const x = Number(alt.values[c.id]);
      const best = fStar[c.id];
      const worst = fMinus[c.id];
      const w = weights[c.id];

      // Jarak normalisasi dij
      let d = 0;
      const denom = Math.abs(best - worst);

      if (denom === 0) {
        d = 0; // Menghindari pembagian nol jika semua alternatif bernilai sama
      } else if (c.type === "cost") {
        d = (x - best) / denom;
      } else {
        d = (best - x) / denom;
      }

      // Jarak terbobot: rij = wj * dij
      const weightedDist = w * d;
      altDistances[c.id] = weightedDist;
      sSum += weightedDist;
      rValues.push(weightedDist);
    });

    const rMax = Math.max(...rValues);

    normalizedMatrix.push({
      id: alt.id,
      code: alt.code || alt.id,
      name: alt.name,
      distances: altDistances
    });

    return {
      ...alt,
      S: sSum,
      R: rMax
    };
  });

  // 4. Mencari S*, S-, R*, R-
  const sList = results.map((r) => r.S);
  const rList = results.map((r) => r.R);

  const sStar = Math.min(...sList);
  const sMinus = Math.max(...sList);
  const rStar = Math.min(...rList);
  const rMinus = Math.max(...rList);

  const sDenom = sMinus - sStar;
  const rDenom = rMinus - rStar;

  // 5. Menghitung Indeks VIKOR (Q)
  results.forEach((item) => {
    const sPart = sDenom === 0 ? 0 : (item.S - sStar) / sDenom;
    const rPart = rDenom === 0 ? 0 : (item.R - rStar) / rDenom;
    item.Q = v * sPart + (1 - v) * rPart;
  });

  // 6. Perangkingan Berdasarkan Nilai Q (Terkecil = Terbaik)
  // Jika Q sama, bandingkan S terkecil, lalu R terkecil
  const ranked = [...results].sort((a, b) => {
    if (Math.abs(a.Q - b.Q) > 0.0000001) return a.Q - b.Q;
    if (Math.abs(a.S - b.S) > 0.0000001) return a.S - b.S;
    return a.R - b.R;
  });

  ranked.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  // 7. Pengujian Kondisi Solusi Kompromi (Acceptable Advantage & Acceptable Stability)
  const bestA1 = ranked[0];
  const secondA2 = ranked[1];

  // Nilai Threshold DQ = 1 / (m - 1)
  const DQ = 1 / (m - 1);
  const diffQ = secondA2.Q - bestA1.Q;

  // Syarat 1: Acceptable Advantage -> Q(A2) - Q(A1) >= DQ
  const condition1Passed = diffQ >= DQ - 0.000001;

  // Syarat 2: Acceptable Stability -> A1 juga harus menjadi yang terbaik pada S atau R (atau keduanya)
  // Periksa apakah A1 memiliki S minimum atau R minimum
  const isBestInS = Math.abs(bestA1.S - sStar) < 0.000001;
  const isBestInR = Math.abs(bestA1.R - rStar) < 0.000001;
  const condition2Passed = isBestInS || isBestInR;

  // Penentuan Himpunan Solusi Kompromi:
  let compromiseSolution = [];
  let compromiseStatus = "";
  let compromiseDescription = "";

  if (condition1Passed && condition2Passed) {
    compromiseSolution = [bestA1];
    compromiseStatus = "SOLUSI_TERBAIK_TUNGGAL";
    compromiseDescription = `${bestA1.name} adalah solusi terbaik mutlak karena memenuhi Syarat Keuntungan yang Dapat Diterima (Advantage) dan Syarat Stabilitas Keputusan.`;
  } else if (!condition1Passed && condition2Passed) {
    // Jika Syarat 1 gagal: alternatif A1, A2, ..., Am di mana Q(Am) - Q(A1) < DQ adalah solusi kompromi bersama
    compromiseSolution = ranked.filter((alt) => alt.Q - bestA1.Q < DQ - 0.000001);
    compromiseStatus = "KOMPROMI_SYARAT_1_GAGAL";
    compromiseDescription = `Syarat Keuntungan (DQ) tidak terpenuhi (selisih Q = ${diffQ.toFixed(4)} < ${DQ.toFixed(4)}). Terdapat ${compromiseSolution.length} laptop yang memiliki performa sangat seimbang dan menjadi solusi kompromi bersama.`;
  } else if (condition1Passed && !condition2Passed) {
    // Jika Syarat 2 gagal: A1 dan A2 keduanya adalah solusi kompromi
    compromiseSolution = [bestA1, secondA2];
    compromiseStatus = "KOMPROMI_SYARAT_2_GAGAL";
    compromiseDescription = `Syarat Stabilitas tidak terpenuhi (${bestA1.name} bukan yang terbaik dalam Utilitas S maupun Regret R). Oleh karena itu, Peringkat 1 dan Peringkat 2 direkomendasikan bersama sebagai kompromi.`;
  } else {
    // Keduanya gagal
    compromiseSolution = ranked.filter((alt) => alt.Q - bestA1.Q < DQ - 0.000001);
    if (!compromiseSolution.find((alt) => alt.id === secondA2.id)) {
      compromiseSolution.push(secondA2);
    }
    compromiseStatus = "KOMPROMI_KEDUA_SYARAT_GAGAL";
    compromiseDescription = `Baik Syarat Keuntungan maupun Syarat Stabilitas tidak terpenuhi sepenuhnya. Beberapa laptop teratas direkomendasikan bersama sebagai solusi kompromi.`;
  }

  return {
    alternativesCount: m,
    weights,
    fStar,
    fMinus,
    sStar,
    sMinus,
    rStar,
    rMinus,
    v,
    DQ,
    diffQ,
    condition1Passed,
    condition2Passed,
    compromiseStatus,
    compromiseDescription,
    compromiseSolution,
    ranked,
    normalizedMatrix
  };
}
