// src/data/criteria.js

export const CRITERIA = [
  {
    id: "C1",
    name: "Harga",
    type: "cost", // Semakin murah nilainya semakin baik (Skor 1 = Terbaik, Skor 5 = Terburuk)
    unit: "Rp",
    weight: 0.1130, // Bobot default dari 37 responden kuesioner
    defaultRating: 4, // Rata-rata kuesioner (dibulatkan)
    description: "Budget pembelian laptop",
    rubric: {
      1: "<= Rp 7.000.000 (Terbaik)",
      2: "> Rp 7.000.000 - Rp 10.000.000",
      3: "> Rp 10.000.000 - Rp 15.000.000",
      4: "> Rp 15.000.000 - Rp 20.000.000",
      5: "> Rp 20.000.000 (Terburuk)"
    }
  },
  {
    id: "C2",
    name: "Prosesor (CPU)",
    type: "benefit", // Semakin tinggi skornya semakin baik
    unit: "Tingkat CPU",
    weight: 0.1344,
    defaultRating: 5,
    description: "Kekuatan komputasi CPU",
    rubric: {
      1: "Celeron / Athlon / Dual-Core",
      2: "Core i3-N305 / Ryzen 3 5425U",
      3: "Core i5 U / Ryzen 5 7530U / Apple M1",
      4: "Core i5 H-HX / Ultra 5 / i7-P / Ryzen 5 HS / M2",
      5: "Core i7 HX / Ultra 7 155H / Ryzen 7 8845HS / M3"
    }
  },
  {
    id: "C3",
    name: "Kapasitas RAM",
    type: "benefit",
    unit: "Kapasitas & Tipe",
    weight: 0.1305,
    defaultRating: 5,
    description: "Besaran memori utama dan opsi upgrade",
    rubric: {
      1: "4 GB",
      2: "8 GB Soldered (Permanen)",
      3: "8 GB Upgradeable (SO-DIMM)",
      4: "12-16 GB Soldered / 12 GB Upgr",
      5: "16-32 GB Upgradeable (Dual Slot)"
    }
  },
  {
    id: "C4",
    name: "Penyimpanan SSD",
    type: "benefit",
    unit: "Kapasitas & Slot",
    weight: 0.1321,
    defaultRating: 5,
    description: "Kapasitas penyimpanan cepat NVMe dan ekspansi slot",
    rubric: {
      1: "128 GB SSD / eMMC",
      2: "256 GB NVMe (Single Slot)",
      3: "512 GB NVMe (Single Slot)",
      4: "512 GB NVMe (Dual Slot M.2)",
      5: "1 TB (1024 GB) NVMe Gen 4"
    }
  },
  {
    id: "C5",
    name: "Kartu Grafis (GPU)",
    type: "benefit",
    unit: "Tingkat GPU",
    weight: 0.1160,
    defaultRating: 4,
    description: "Performa render grafis dan gaming",
    rubric: {
      1: "Integrated UHD / Radeon Standar",
      2: "Iris Xe / Apple M1-M2 GPU",
      3: "Intel Arc / M3 GPU / RTX 2050 / RTX A500",
      4: "NVIDIA RTX 3050 6GB / RTX 4050 6GB",
      5: "NVIDIA GeForce RTX 4060 8GB"
    }
  },
  {
    id: "C6",
    name: "Portabilitas (Berat)",
    type: "benefit", // Di rubrik, semakin ringan diberi skor semakin tinggi (5)
    unit: "Rentang Bobot",
    weight: 0.1183,
    defaultRating: 4,
    description: "Keringanan fisik laptop untuk mobilitas",
    rubric: {
      1: "> 2,30 kg (Sangat Berat)",
      2: "2,01 - 2,30 kg (Berat)",
      3: "1,61 - 2,00 kg (Sedang)",
      4: "1,35 - 1,60 kg (Ringan)",
      5: "< 1,35 kg (Sangat Ringan)"
    }
  },
  {
    id: "C7",
    name: "Daya Tahan Baterai",
    type: "benefit",
    unit: "Estimasi Durasi",
    weight: 0.1260,
    defaultRating: 4,
    description: "Daya tahan pemakaian tanpa charger",
    rubric: {
      1: "< 4 Jam",
      2: "4 - 5,5 Jam (Gaming Standar)",
      3: "5,5 - 7 Jam (40-60 Wh)",
      4: "7,5 - 11 Jam (57-80 Wh Efisien)",
      5: "> 12 Jam (Apple Silicon 15-18 Jam)"
    }
  },
  {
    id: "C8",
    name: "Service Center & Garansi",
    type: "benefit",
    unit: "Dukungan Garansi",
    weight: 0.1298,
    defaultRating: 5,
    description: "Ketersediaan service center di Palembang dan lama garansi",
    rubric: {
      1: "Tidak ada SC di Palembang",
      2: "Mitra Koleksi Terbatas, 1 Thn",
      3: "Authorized Partner (iBox/Mitra), 1-2 Thn",
      4: "SC Resmi Palembang, 2 Thn Standar",
      5: "SC Resmi Utama Palembang, 2-3 Thn + ADP/VIP"
    }
  }
];