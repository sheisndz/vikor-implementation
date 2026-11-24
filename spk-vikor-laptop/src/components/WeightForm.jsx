import React, { useState } from 'react';
import { Sliders, HelpCircle, ChevronDown, ChevronUp, Scale, Info } from 'lucide-react';

export default function WeightForm({
  criteria,
  rawWeights,
  onWeightChange,
  v,
  onVChange
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeRubricId, setActiveRubricId] = useState(null);

  const totalWeight = criteria.reduce((sum, c) => sum + (rawWeights[c.id] || 1), 0);

  const getWeightPercentage = (id) => {
    const val = rawWeights[id] || 1;
    if (totalWeight === 0) return '0.0%';
    return ((val / totalWeight) * 100).toFixed(1) + '%';
  };

  const toggleRubric = (id) => {
    setActiveRubricId(activeRubricId === id ? null : id);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="80"
      className="bg-white rounded-3xl border border-[#F3D5E3] shadow-pastel p-5 sm:p-6 space-y-5 transition-colors hover:border-[#FA80B1]/60"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#FDE2E4]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E4BDFE]/55 text-[#3A2334] flex items-center justify-center shrink-0">
            <Sliders className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h2 className="font-heading text-sm font-bold text-[#3A2334] tracking-tight">
              Tingkat Kepentingan Kriteria
            </h2>
            <p className="text-[11px] text-[#7D5D73]">
              Atur slider prioritas skala 1–5 sesuai kebutuhan Anda
            </p>
          </div>
        </div>
        <span className="text-[11px] font-semibold bg-[#FDE2E4] text-[#3A2334] px-3 py-1 rounded-full shrink-0">
          8 Kriteria
        </span>
      </div>

      {/* Criteria Sliders List */}
      <div className="space-y-2.5">
        {criteria.map((c) => {
          const val = rawWeights[c.id] || 1;
          const isCost = c.type === 'cost';
          const isRubricOpen = activeRubricId === c.id;

          return (
            <div
              key={c.id}
              className="p-3.5 rounded-2xl bg-[#FFF8F3] border border-[#F3D5E3]/80 space-y-2.5 hover:border-[#FA80B1]/60 transition-colors"
            >
              {/* Row 1: Code, Name, Type Tag, Weight % */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-[11px] font-bold bg-[#FDE2E4] text-[#3A2334] px-2 py-0.5 rounded-lg shrink-0">
                    {c.id}
                  </span>
                  <span className="text-xs font-semibold text-[#3A2334] truncate">
                    {c.name}
                  </span>
                  <span
                    className={`hidden sm:inline-block text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      isCost
                        ? 'bg-[#FEC5E7]/70 text-[#3A2334]'
                        : 'bg-[#E4BDFE]/60 text-[#3A2334]'
                    }`}
                  >
                    {isCost ? 'Cost' : 'Benefit'}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono font-bold bg-[#FFF1E6] text-[#3A2334] border border-[#F3D5E3] px-2.5 py-0.5 rounded-full">
                    {getWeightPercentage(c.id)}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleRubric(c.id)}
                    className={`p-1 rounded-full transition-colors cursor-pointer ${
                      isRubricOpen
                        ? 'bg-[#FA80B1] text-white'
                        : 'text-[#7D5D73] hover:text-[#3A2334] hover:bg-[#FDE2E4]'
                    }`}
                    title="Buka rubrik panduan kriteria"
                  >
                    <HelpCircle className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={val}
                  onChange={(e) =>
                    onWeightChange({
                      ...rawWeights,
                      [c.id]: Number(e.target.value)
                    })
                  }
                  className="w-full h-1.5 bento-range cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-medium text-[#7D5D73]/80">
                  <span className={val === 1 ? 'font-bold text-[#FA80B1]' : ''}>1 (Rendah)</span>
                  <span className={val === 2 ? 'font-bold text-[#FA80B1]' : ''}>2</span>
                  <span className={val === 3 ? 'font-bold text-[#3A2334]' : ''}>3 (Sedang)</span>
                  <span className={val === 4 ? 'font-bold text-[#FA80B1]' : ''}>4</span>
                  <span className={val === 5 ? 'font-bold text-[#FA80B1]' : ''}>5 (Penting)</span>
                </div>
              </div>

              {/* Rubric Drawer */}
              {isRubricOpen && c.rubric && (
                <div className="mt-2 p-3 bg-white rounded-xl border border-[#FEC5E7] text-[11px] space-y-1 text-[#3A2334]">
                  <div className="font-heading text-[10px] text-[#FA80B1] uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                    <Info className="w-3 h-3" />
                    Panduan Rubrik Penilaian
                  </div>
                  {Object.entries(c.rubric).map(([score, desc]) => (
                    <div key={score} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-[#FA80B1] shrink-0 w-3">
                        {score}:
                      </span>
                      <span className="text-[#7D5D73]">{desc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Advanced Settings Toggle (Parameter Strategi v) */}
      <div className="pt-3 border-t border-[#FDE2E4]">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between text-xs font-heading font-bold text-[#3A2334] hover:text-[#FA80B1] py-1 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 text-[#FA80B1]" />
            Pengaturan Lanjutan: Parameter Strategi (v = {v})
          </span>
          {showAdvanced ? (
            <ChevronUp className="w-4 h-4 text-[#FA80B1]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#7D5D73]" />
          )}
        </button>

        {showAdvanced && (
          <div className="mt-3 p-4 bg-[#FFF1E6]/70 rounded-2xl border border-[#FDE2E4] space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#3A2334]">
                Bobot Strategi Mayoritas Utilitas (v)
              </span>
              <span className="font-mono font-bold text-[#3A2334] bg-[#E4BDFE] px-2.5 py-0.5 rounded-full">
                {Number(v).toFixed(2)}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={v}
              onChange={(e) => onVChange(Number(e.target.value))}
              className="w-full h-1.5 bento-range cursor-pointer"
            />

            <div className="flex justify-between text-[10px] font-medium text-[#7D5D73]">
              <span>0.0 (Veto/Regret)</span>
              <span className="text-[#FA80B1] font-bold">0.5 (Seimbang)</span>
              <span>1.0 (Mayoritas Utilitas)</span>
            </div>

            <p className="text-[11px] text-[#7D5D73] leading-relaxed bg-white p-3 rounded-xl border border-[#F3D5E3]">
              Nilai default <strong className="text-[#3A2334]">0.5</strong> mencerminkan konsensus seimbang antara kepuasan mayoritas kriteria (S) dan minimalisasi risiko penyesalan terburuk (R).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
