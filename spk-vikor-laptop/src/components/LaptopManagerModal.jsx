import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, RotateCcw, Laptop } from 'lucide-react';
import { formatRupiah, getPriceScore, getNextLaptopCode } from '../utils/formatters';

const DEFAULT_NEW_LAPTOP = {
  name: '',
  brand: 'Lenovo',
  os: 'Windows',
  price: 10000000,
  specsText: '',
  values: {
    C1: getPriceScore(10000000),
    C2: 3,
    C3: 3,
    C4: 3,
    C5: 3,
    C6: 3,
    C7: 3,
    C8: 3
  }
};

export default function LaptopManagerModal({
  isOpen,
  onClose,
  laptops,
  onAddLaptop,
  onDeleteLaptop,
  onResetToDefault,
  criteria
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLaptop, setNewLaptop] = useState(DEFAULT_NEW_LAPTOP);

  // Tutup modal dengan tombol Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePriceChange = (priceValue) => {
    const numericPrice = Number(priceValue);
    setNewLaptop((prev) => ({
      ...prev,
      price: numericPrice,
      values: {
        ...prev.values,
        C1: getPriceScore(numericPrice)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newLaptop.name.trim()) return;

    const nextCode = getNextLaptopCode(laptops);
    const numericPrice = Number(newLaptop.price);
    const laptopToAdd = {
      ...newLaptop,
      id: `custom-${Date.now()}`,
      code: nextCode,
      price: numericPrice,
      cpu: newLaptop.specsText ? newLaptop.specsText.split('•')[0]?.trim() : 'Custom CPU',
      ram: 'Sesuai Skor C3',
      storage: 'Sesuai Skor C4',
      battery: 'Sesuai Skor C7',
      warranty: 'Sesuai Skor C8',
      values: { ...newLaptop.values }
    };

    onAddLaptop(laptopToAdd);
    setShowAddForm(false);
    setNewLaptop(DEFAULT_NEW_LAPTOP);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-laptop-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A2334]/35 backdrop-blur-xs"
    >
      <div className="bg-[#FFF8F3] text-[#3A2334] rounded-3xl border border-[#FEC5E7] shadow-pastel-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#FDE2E4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FA80B1] text-white rounded-2xl flex items-center justify-center">
              <Laptop className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 id="modal-laptop-title" className="font-heading text-base sm:text-lg font-bold text-[#3A2334]">
                Database Koleksi Laptop
              </h3>
              <p className="text-xs text-[#7D5D73]">
                Total {laptops.length} laptop aktif (tersimpan di localStorage)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal"
            className="w-9 h-9 rounded-full bg-[#FDE2E4] text-[#3A2334] hover:bg-[#FA80B1] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-heading font-bold text-[#3A2334] bg-[#E4BDFE] hover:bg-[#D7A3FD] rounded-full transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>{showAddForm ? 'Tutup Formulir' : 'Tambah Laptop Baru'}</span>
            </button>

            <button
              type="button"
              onClick={onResetToDefault}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#3A2334] bg-[#FDE2E4] hover:bg-[#FEC5E7] border border-[#FEC5E7] rounded-full transition-all cursor-pointer"
              title="Kembalikan ke 20 data laptop bawaan riset pasar"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
              <span>Reset ke 20 Laptop Bawaan</span>
            </button>
          </div>

          {/* Form Tambah Laptop */}
          {showAddForm && (
            <form
              onSubmit={handleSubmit}
              className="p-5 bg-white rounded-3xl border border-[#F3D5E3] space-y-4"
            >
              <h4 className="text-xs font-heading text-[#FA80B1] uppercase tracking-wider font-bold">
                Formulir Tambah Alternatif Laptop ({getNextLaptopCode(laptops)})
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                <div>
                  <label htmlFor="new-laptop-name" className="block text-[#7D5D73] font-semibold mb-1.5">
                    Nama Laptop
                  </label>
                  <input
                    id="new-laptop-name"
                    type="text"
                    required
                    placeholder="Contoh: ASUS Zenbook 14 OLED"
                    value={newLaptop.name}
                    onChange={(e) => setNewLaptop({ ...newLaptop, name: e.target.value })}
                    className="w-full bg-[#FFF8F3] border border-[#F3D5E3] rounded-2xl px-3.5 py-2.5 text-xs text-[#3A2334] placeholder:text-[#7D5D73]/50 focus:border-[#FA80B1] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="new-laptop-brand" className="block text-[#7D5D73] font-semibold mb-1.5">
                    Merek
                  </label>
                  <select
                    id="new-laptop-brand"
                    value={newLaptop.brand}
                    onChange={(e) => setNewLaptop({ ...newLaptop, brand: e.target.value })}
                    className="w-full bg-[#FFF8F3] border border-[#F3D5E3] rounded-2xl px-3.5 py-2.5 text-xs text-[#3A2334] focus:border-[#FA80B1] focus:outline-hidden"
                  >
                    <option value="Lenovo">Lenovo</option>
                    <option value="ASUS">ASUS</option>
                    <option value="Apple">Apple</option>
                    <option value="Acer">Acer</option>
                    <option value="HP">HP</option>
                    <option value="MSI">MSI</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="new-laptop-os" className="block text-[#7D5D73] font-semibold mb-1.5">
                    Sistem Operasi
                  </label>
                  <select
                    id="new-laptop-os"
                    value={newLaptop.os}
                    onChange={(e) => setNewLaptop({ ...newLaptop, os: e.target.value })}
                    className="w-full bg-[#FFF8F3] border border-[#F3D5E3] rounded-2xl px-3.5 py-2.5 text-xs text-[#3A2334] focus:border-[#FA80B1] focus:outline-hidden"
                  >
                    <option value="Windows">Windows</option>
                    <option value="macOS">macOS</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="new-laptop-price" className="block text-[#7D5D73] font-semibold mb-1.5">
                    Harga (Rp)
                  </label>
                  <input
                    id="new-laptop-price"
                    type="number"
                    required
                    min="1000000"
                    step="100000"
                    value={newLaptop.price}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full bg-[#FFF8F3] border border-[#F3D5E3] rounded-2xl px-3.5 py-2.5 text-xs font-mono font-bold text-[#3A2334] focus:border-[#FA80B1] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label htmlFor="new-laptop-specs" className="block text-[#7D5D73] font-semibold mb-1.5">
                  Ringkasan Spesifikasi (Opsional)
                </label>
                <input
                  id="new-laptop-specs"
                  type="text"
                  placeholder="Contoh: Core Ultra 5 • 16GB RAM • 512GB SSD • 14&quot; OLED"
                  value={newLaptop.specsText}
                  onChange={(e) => setNewLaptop({ ...newLaptop, specsText: e.target.value })}
                  className="w-full bg-[#FFF8F3] border border-[#F3D5E3] rounded-2xl px-3.5 py-2.5 text-xs text-[#3A2334] placeholder:text-[#7D5D73]/50 focus:border-[#FA80B1] focus:outline-hidden"
                />
              </div>

              {/* Skor Kriteria 1-5 */}
              <div>
                <label className="block text-xs font-heading text-[#3A2334] mb-2.5 font-bold">
                  Nilai Skor Sub-Kriteria (Skala 1 – 5, C1 otomatis mengikuti harga)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {criteria.map((c) => (
                    <div
                      key={c.id}
                      className="p-3 bg-[#FFF8F3] rounded-2xl border border-[#F3D5E3] text-xs space-y-2"
                    >
                      <div className="flex justify-between items-center font-semibold">
                        <span className="text-[11px] text-[#7D5D73] truncate">
                          {c.id} ({c.name})
                        </span>
                        <span className="font-mono text-[#FA80B1] font-bold text-xs">
                          {newLaptop.values[c.id]}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        aria-label={`Skor ${c.id} ${c.name}`}
                        value={newLaptop.values[c.id]}
                        onChange={(e) =>
                          setNewLaptop({
                            ...newLaptop,
                            values: {
                              ...newLaptop.values,
                              [c.id]: Number(e.target.value)
                            }
                          })
                        }
                        className="w-full h-1 bento-range cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs text-[#7D5D73] hover:text-[#3A2334] hover:bg-[#FDE2E4] rounded-full transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-heading font-bold text-white bg-[#FA80B1] hover:bg-[#EA6B9E] rounded-full transition-colors cursor-pointer"
                >
                  Simpan Laptop Baru
                </button>
              </div>
            </form>
          )}

          {/* List Tabel Laptop */}
          <div className="overflow-x-auto rounded-2xl border border-[#F3D5E3]">
            <table className="w-full text-xs text-left bg-white">
              <thead className="bg-[#FDE2E4]/65 text-[#3A2334] font-heading border-b border-[#F3D5E3] text-[11px]">
                <tr>
                  <th className="py-3 px-3">Kode</th>
                  <th className="py-3 px-3">Nama Laptop</th>
                  <th className="py-3 px-3">Merek / OS</th>
                  <th className="py-3 px-3 text-right">Harga</th>
                  <th className="py-3 px-3 text-center">Skor (C1-C8)</th>
                  <th className="py-3 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FDE2E4]/60">
                {laptops.map((l) => (
                  <tr key={l.id} className="hover:bg-[#FFF8F3] transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-[#FA80B1]">{l.code}</td>
                    <td className="py-2.5 px-3 font-semibold text-[#3A2334]">{l.name}</td>
                    <td className="py-2.5 px-3 text-[#7D5D73]">{l.brand} • {l.os}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#3A2334]">
                      {formatRupiah(l.price)}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-[#7D5D73] text-[11px]">
                      [{l.values.C1},{l.values.C2},{l.values.C3},{l.values.C4},{l.values.C5},{l.values.C6},{l.values.C7},{l.values.C8}]
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {laptops.length > 2 && (
                        <button
                          type="button"
                          onClick={() => onDeleteLaptop(l.id)}
                          aria-label={`Hapus ${l.name}`}
                          className="p-1.5 text-[#7D5D73] hover:text-[#FA80B1] transition-colors cursor-pointer"
                          title="Hapus laptop ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#FDE2E4] bg-white flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-heading font-bold text-white bg-[#FA80B1] hover:bg-[#EA6B9E] rounded-full transition-colors cursor-pointer"
          >
            Selesai & Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
