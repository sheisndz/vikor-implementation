import React from 'react';
import { Sparkles } from 'lucide-react';
import { PRESETS } from '../data/presets';

export default function PresetBar({ activePresetId, onSelectPreset }) {
  const activePreset = PRESETS.find((p) => p.id === activePresetId);

  return (
    <div
      id="role-section"
      data-aos="fade-up"
      className="bg-white rounded-3xl border border-[#F3D5E3] shadow-pastel p-5 space-y-4 transition-colors hover:border-[#FA80B1]/60"
    >
      {/* Compact Header (matching FilterPanel style) */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#FDE2E4]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#FDE2E4] text-[#FA80B1] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="font-heading text-sm font-bold text-[#3A2334] tracking-tight">
              Profil Kebutuhan Role
            </h2>
            <p className="text-[11px] text-[#7D5D73]">
              {activePreset
                ? activePreset.desc
                : 'Mode kustom — bobot diatur manual di bawah'}
            </p>
          </div>
        </div>
      </div>

      {/* Compact Filter-Style Pill Chips */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const Icon = preset.icon;
          const isActive = activePresetId === preset.id;

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset)}
              style={
                isActive
                  ? { backgroundColor: preset.pastelBg, color: preset.activeText }
                  : undefined
              }
              title={preset.desc}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-[#FA80B1]/40 shadow-sm -translate-y-0.5 ring-2 ring-[#FA80B1]/25'
                  : 'bg-[#FFF8F3] border-[#F3D5E3] text-[#3A2334]/80 hover:text-[#3A2334] hover:border-[#FA80B1] hover:bg-[#FDE2E4]/40 hover:-translate-y-0.5'
              }`}
            >
              <Icon className="w-3.5 h-3.5 stroke-[2]" />
              <span>{preset.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
