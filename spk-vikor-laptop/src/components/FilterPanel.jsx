import React from 'react';
import { SlidersHorizontal, DollarSign, Monitor, Tag, AlertCircle } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export default function FilterPanel({
  filters,
  onFilterChange,
  totalAvailable,
  totalFiltered,
  brands = []
}) {
  const isFiltered =
    filters.maxBudget < 30000000 ||
    filters.os !== 'all' ||
    filters.brand !== 'all';

  const handleResetFilters = () => {
    onFilterChange({
      maxBudget: 30000000,
      os: 'all',
      brand: 'all'
    });
  };

  return (
    <div
      data-aos="fade-up"
      className="bg-white rounded-3xl border border-[#F3D5E3] shadow-pastel p-5 sm:p-6 space-y-5 transition-colors hover:border-[#FA80B1]/60"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#FDE2E4]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FEC5E7]/55 text-[#3A2334] flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h2 className="font-heading text-sm font-bold text-[#3A2334] tracking-tight">
              Filter Kandidat Laptop
            </h2>
            <p className="text-[11px] text-[#7D5D73]">
              Saring pilihan sebelum dihitung algoritma VIKOR
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-[11px] font-semibold px-3 py-1 rounded-full ${
              totalFiltered < 2
                ? 'bg-[#FA80B1] text-white'
                : 'bg-[#E4BDFE]/50 text-[#3A2334] border border-[#E4BDFE]'
            }`}
          >
            {totalFiltered}/{totalAvailable} Cocok
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#FA80B1] hover:text-[#3A2334] font-bold transition-colors cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Warning if filtered < 2 */}
      {totalFiltered < 2 && (
        <div className="p-3.5 rounded-2xl bg-[#FDE2E4] border border-[#FA80B1]/45 flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#FA80B1] mt-0.5" />
          <div>
            <p className="font-heading font-bold text-[#3A2334]">
              Jumlah Kurang Dari 2 Laptop
            </p>
            <p className="text-[11px] text-[#7D5D73] mt-0.5 leading-relaxed">
              Metode VIKOR membutuhkan minimal 2 alternatif untuk membandingkan solusi terbaik dan terburuk. Silakan longgarkan filter.
            </p>
          </div>
        </div>
      )}

      {/* Budget Slider */}
      <div className="bg-[#FFF1E6]/75 p-4 rounded-2xl border border-[#FDE2E4] space-y-3">
        <div className="flex justify-between items-center text-xs gap-2">
          <span className="font-semibold text-[#3A2334] flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#FA80B1]" />
            Batas Budget Maksimal
          </span>
          <span className="font-heading font-bold text-xs bg-[#FA80B1] text-white px-3 py-1 rounded-full">
            {formatRupiah(filters.maxBudget)}
          </span>
        </div>

        <input
          id="filter-budget"
          type="range"
          min="6000000"
          max="30000000"
          step="500000"
          aria-label="Batas Budget Maksimal"
          value={filters.maxBudget}
          onChange={(e) =>
            onFilterChange({ ...filters, maxBudget: Number(e.target.value) })
          }
          className="w-full h-1.5 bento-range cursor-pointer"
        />

        <div className="flex justify-between text-[10px] font-medium text-[#7D5D73]">
          <span>Rp 6 Jt</span>
          <span className="text-[#FA80B1] font-bold">Rp 15 Jt</span>
          <span>Rp 30 Jt</span>
        </div>
      </div>

      {/* Dropdown Filters: OS & Brand */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* OS Filter */}
        <div className="space-y-1.5">
          <label
            htmlFor="filter-os"
            className="text-[11px] font-semibold text-[#7D5D73] flex items-center gap-1.5 uppercase tracking-wider"
          >
            <Monitor className="w-3 h-3 text-[#FA80B1]" />
            Sistem Operasi
          </label>
          <select
            id="filter-os"
            value={filters.os}
            onChange={(e) => onFilterChange({ ...filters, os: e.target.value })}
            className="w-full text-xs bg-[#FFF8F3] border border-[#F3D5E3] rounded-2xl px-3.5 py-2.5 text-[#3A2334] font-medium focus:outline-hidden focus:border-[#FA80B1] transition-colors cursor-pointer"
          >
            <option value="all">Semua OS (Windows & Mac)</option>
            <option value="Windows">Windows Saja</option>
            <option value="macOS">macOS Saja</option>
          </select>
        </div>

        {/* Brand Filter */}
        <div className="space-y-1.5">
          <label
            htmlFor="filter-brand"
            className="text-[11px] font-semibold text-[#7D5D73] flex items-center gap-1.5 uppercase tracking-wider"
          >
            <Tag className="w-3 h-3 text-[#FA80B1]" />
            Merek Laptop
          </label>
          <select
            id="filter-brand"
            value={filters.brand}
            onChange={(e) => onFilterChange({ ...filters, brand: e.target.value })}
            className="w-full text-xs bg-[#FFF8F3] border border-[#F3D5E3] rounded-2xl px-3.5 py-2.5 text-[#3A2334] font-medium focus:outline-hidden focus:border-[#FA80B1] transition-colors cursor-pointer"
          >
            <option value="all">Semua Merek</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
