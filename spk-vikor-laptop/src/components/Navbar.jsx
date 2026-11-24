import React from 'react';
import { RotateCcw, Settings2, Sparkles } from 'lucide-react';

export default function Navbar({ laptopCount, onReset, onOpenManager }) {
  return (
    <div
      data-aos="fade-down"
      data-aos-duration="600"
      className="fixed top-4 inset-x-0 z-50 px-4 pointer-events-none"
    >
      <header className="pointer-events-auto max-w-5xl mx-auto bg-white/88 backdrop-blur-xl border border-[#FEC5E7] rounded-full px-3 sm:px-5 py-2.5 shadow-pastel-lg flex items-center justify-between gap-3 transition-all duration-300 hover:border-[#FA80B1]">
        {/* Brand */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 pl-1 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="w-9 h-9 rounded-full bg-[#FA80B1] text-white flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
            <Sparkles className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="leading-tight">
            <span className="font-heading text-sm sm:text-base font-extrabold text-[#3A2334] tracking-tight block group-hover:text-[#FA80B1] transition-colors">
              SPK VIKOR
            </span>
            <span className="text-[10px] text-[#7D5D73] hidden sm:block">
              Rekomendasi Laptop Mahasiswa
            </span>
          </div>
        </a>

        {/* Action Pill Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#3A2334] bg-[#E4BDFE]/40 hover:bg-[#E4BDFE]/75 border border-[#E4BDFE] rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            title="Reset form ke pengaturan awal"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={onOpenManager}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-heading font-bold text-white bg-[#FA80B1] hover:bg-[#EA6B9E] rounded-full shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(250,128,177,0.4)] active:scale-95 cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5 stroke-[2.2]" />
            <span className="hidden sm:inline">Koleksi Laptop</span>
            <span className="sm:hidden">Data</span>
            <span className="ml-0.5 px-2 py-0.5 bg-white text-[#FA80B1] rounded-full text-[10px] font-mono font-bold leading-none">
              {laptopCount}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}
