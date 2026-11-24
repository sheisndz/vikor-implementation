import React, { useState, useMemo, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import PresetBar from './components/PresetBar';
import FilterPanel from './components/FilterPanel';
import WeightForm from './components/WeightForm';
import ResultCards from './components/ResultCards';
import VikorStepsTable from './components/VikorStepsTable';
import LaptopManagerModal from './components/LaptopManagerModal';

import { CRITERIA } from './data/criteria';
import { PRESETS } from './data/presets';
import defaultLaptops from './data/laptops.json';
import { calculateVikor } from './utils/vikorEngine';

export default function App() {
  // Inisialisasi AOS untuk animasi scroll & navbar
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30
    });
  }, []);

  // 1. State Database Laptop (tersimpan di localStorage)
  const [laptops, setLaptops] = useState(() => {
    try {
      const saved = localStorage.getItem('vikor_laptops_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Gagal membaca data dari localStorage:', e);
    }
    return defaultLaptops;
  });

  // Simpan ke localStorage saat data laptop berubah
  useEffect(() => {
    try {
      localStorage.setItem('vikor_laptops_data', JSON.stringify(laptops));
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage:', e);
    }
  }, [laptops]);

  // 2. State Filter
  const [filters, setFilters] = useState({
    maxBudget: 30000000,
    os: 'all',
    brand: 'all'
  });

  // 3. State Bobot Pengguna & Preset
  const [activePresetId, setActivePresetId] = useState('kuesioner');
  const [userWeights, setUserWeights] = useState({
    C1: 4,
    C2: 5,
    C3: 5,
    C4: 5,
    C5: 4,
    C6: 4,
    C7: 4,
    C8: 5
  });

  // 4. State Parameter Strategi v (default 0.5)
  const [v, setV] = useState(0.5);

  // 5. State Modal Kelola Data
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  // Daftar merek unik dari data laptop yang ada
  const availableBrands = useMemo(() => {
    const brandsSet = new Set(laptops.map((l) => l.brand));
    return Array.from(brandsSet).sort();
  }, [laptops]);

  // Filter laptop sebelum dihitung VIKOR
  const filteredLaptops = useMemo(() => {
    return laptops.filter((laptop) => {
      const matchBudget = laptop.price <= filters.maxBudget;
      const matchOS = filters.os === 'all' || laptop.os === filters.os;
      const matchBrand = filters.brand === 'all' || laptop.brand === filters.brand;
      return matchBudget && matchOS && matchBrand;
    });
  }, [laptops, filters]);

  // Eksekusi Mesin VIKOR
  const vikorResult = useMemo(() => {
    if (filteredLaptops.length < 2) return null;
    return calculateVikor(filteredLaptops, CRITERIA, userWeights, v);
  }, [filteredLaptops, userWeights, v]);

  // Handler Ganti Preset
  const handleSelectPreset = (preset) => {
    setActivePresetId(preset.id);
    setUserWeights({ ...preset.weights });
  };

  // Handler Ganti Bobot Manual
  const handleWeightChange = (newWeights) => {
    setUserWeights(newWeights);
    setActivePresetId(null);
  };

  // Handler Reset Semua Preferensi
  const handleResetAll = () => {
    setFilters({
      maxBudget: 30000000,
      os: 'all',
      brand: 'all'
    });
    const defaultPreset = PRESETS.find((p) => p.id === 'kuesioner');
    if (defaultPreset) {
      handleSelectPreset(defaultPreset);
    }
    setV(0.5);
  };

  // Handler Laptop Manager
  const handleAddLaptop = (newLap) => {
    setLaptops((prev) => [newLap, ...prev]);
  };

  const handleDeleteLaptop = (id) => {
    setLaptops((prev) => prev.filter((l) => l.id !== id));
  };

  const handleResetToDefaultLaptops = () => {
    if (window.confirm('Kembalikan database ke 20 laptop bawaan hasil riset pasar?')) {
      setLaptops(defaultLaptops);
      localStorage.removeItem('vikor_laptops_data');
    }
  };

  return (
    <div
      id="top"
      className="min-h-screen bg-[#FFF8F3] text-[#3A2334] flex flex-col font-body selection:bg-[#FEC5E7] selection:text-[#3A2334]"
    >
      {/* 1. Floating Pill Navbar */}
      <Navbar
        laptopCount={laptops.length}
        onReset={handleResetAll}
        onOpenManager={() => setIsManagerOpen(true)}
      />

      {/* 2. Main Dashboard Layout (langsung seperti layout awal) */}
      <main className="relative flex-1 ambient-pastel-glow pt-24 pb-10">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact Status Bar Tag (seperti layout awal) */}
          <div
            data-aos="fade-up"
            className="mb-6 flex items-center justify-between flex-wrap gap-2.5">
              
            <div className="inline-flex items-center gap-2 bg-white border border-[#FEC5E7] px-3.5 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FA80B1] inline-block animate-pulse" />
              <span className="font-heading text-xs text-[#3A2334] uppercase font-bold tracking-wider">
                SPK VIKOR Aktif
              </span>
            </div>
          </div>

          {/* Grid 2 Kolom (5 / 7) seperti awal */}
          <div
            id="dashboard-section"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-start"
          >
            {/* KOLOM KIRI (PROFIL ROLE, FILTER & SLIDERS) - 5 Kolom */}
            <section className="lg:col-span-5 space-y-6">
              <PresetBar
                activePresetId={activePresetId}
                onSelectPreset={handleSelectPreset}
              />

              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                totalAvailable={laptops.length}
                totalFiltered={filteredLaptops.length}
                brands={availableBrands}
              />

              <WeightForm
                criteria={CRITERIA}
                rawWeights={userWeights}
                onWeightChange={handleWeightChange}
                v={v}
                onVChange={setV}
              />
            </section>

            {/* KOLOM KANAN (HASIL REKOMENDASI & TABEL TRANSPARANSI) - 7 Kolom */}
            <section className="lg:col-span-7 space-y-6">
              <ResultCards vikorResult={vikorResult} />

              <VikorStepsTable
                vikorResult={vikorResult}
                criteria={CRITERIA}
              />
            </section>
          </div>
        </div>
      </main>

      {/* 3. Compact Solid Primary Accent Footer */}
      <footer className="bg-[#FA80B1] text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-medium">
            <span className="font-heading font-extrabold text-sm">
              Rekomendasi Pemilihan Laptop dengan Metode Vikor • Sistem Pengambilan Keputusan Mahasiswa
            </span>
        </div>
      </footer>

      {/* 4. Modal Kelola Data Laptop */}
      <LaptopManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        laptops={laptops}
        onAddLaptop={handleAddLaptop}
        onDeleteLaptop={handleDeleteLaptop}
        onResetToDefault={handleResetToDefaultLaptops}
        criteria={CRITERIA}
      />
    </div>
  );
}
