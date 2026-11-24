import React from 'react';
import { Trophy, Award, CheckCircle2, AlertTriangle, Cpu, HardDrive, Zap, ShieldCheck, Sparkles } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';

export default function ResultCards({ vikorResult }) {
  if (!vikorResult || !vikorResult.ranked || vikorResult.ranked.length === 0) {
    return (
      <div
        data-aos="fade-up"
        className="bg-white rounded-3xl border border-dashed border-[#FA80B1]/50 p-10 text-center space-y-2 shadow-pastel"
      >
        <p className="font-heading text-[#3A2334] font-bold text-base">
          Belum Ada Hasil Rekomendasi
        </p>
        <p className="text-xs text-[#7D5D73]">
          Pastikan filter menyisakan minimal 2 laptop untuk dihitung oleh metode VIKOR.
        </p>
      </div>
    );
  }

  const {
    ranked,
    compromiseStatus,
    compromiseDescription,
    compromiseSolution = [],
    DQ,
    diffQ
  } = vikorResult;

  const top3 = ranked.slice(0, 3);
  const bestLaptop = top3[0];
  const runnerUps = top3.slice(1, 3);

  const isUniqueBest = compromiseStatus === 'SOLUSI_TERBAIK_TUNGGAL';

  return (
    <div id="result-section" className="space-y-4">
      {/* 1. Compromise Status Banner */}
      <div
        data-aos="fade-up"
        className={`p-4 rounded-3xl border shadow-pastel flex items-start gap-3.5 ${
          isUniqueBest
            ? 'bg-[#E4BDFE]/35 border-[#E4BDFE]'
            : 'bg-[#FFF1E6] border-[#FEC5E7]'
        }`}
      >
        <div
          className={`p-2 rounded-2xl shrink-0 mt-0.5 ${
            isUniqueBest
              ? 'bg-[#E4BDFE] text-[#3A2334]'
              : 'bg-[#FEC5E7] text-[#3A2334]'
          }`}
        >
          {isUniqueBest ? (
            <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
          ) : (
            <AlertTriangle className="w-4 h-4 stroke-[2.2]" />
          )}
        </div>

        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-heading text-xs sm:text-sm font-bold tracking-tight text-[#3A2334]">
              {isUniqueBest
                ? 'Solusi Terbaik Mutlak Terbukti'
                : 'Status: Solusi Kompromi Bersama'}
            </h3>
            <span className="font-mono text-[11px] font-semibold bg-white/85 text-[#3A2334] px-2.5 py-0.5 rounded-full border border-[#F3D5E3]">
              DQ = {DQ.toFixed(4)} • ΔQ = {diffQ.toFixed(4)}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[#7D5D73]">
            {compromiseDescription}
          </p>
        </div>
      </div>

      {/* 2. Top 3 Section Header */}
      <div data-aos="fade-up" className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-[#FDE2E4] text-[#FA80B1] flex items-center justify-center">
            <Trophy className="w-4 h-4 stroke-[2]" />
          </span>
          <h2 className="font-heading text-sm sm:text-base font-bold text-[#3A2334]">
            Top 3 Rekomendasi Terbaik
          </h2>
        </div>
        <span className="text-[11px] font-medium text-[#7D5D73] bg-white px-3 py-1 rounded-full border border-[#F3D5E3]">
          Urut nilai Q terkecil
        </span>
      </div>

      {/* 3. Hero Card: Rank #1 (Warm Blush-Cream Pastel Card) */}
      {bestLaptop && (
        <div
          data-aos="fade-up"
          data-aos-delay="60"
          className="bg-gradient-to-br from-[#FFF1E6] via-white to-[#FDE2E4]/70 text-[#3A2334] rounded-3xl overflow-hidden shadow-pastel-lg border-2 border-[#FA80B1]/45 transition-transform duration-300 hover:-translate-y-1"
        >
          {/* Pastel Rose Pink Top Strip */}
          <div className="bg-[#FA80B1] text-white px-5 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 stroke-[2.2]" />
              <span className="font-heading text-xs font-extrabold uppercase tracking-wider">
                Peringkat #1 • Rekomendasi Utama
              </span>
            </div>
            <span className="font-mono text-xs bg-white text-[#FA80B1] px-3 py-0.5 rounded-full font-bold">
              {bestLaptop.code}
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {/* Laptop Header Info */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-heading font-bold text-[#3A2334] bg-[#FEC5E7] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {bestLaptop.brand}
                  </span>
                  <span className="text-[10px] font-heading font-bold text-[#3A2334] bg-[#E4BDFE] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {bestLaptop.os}
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#3A2334] leading-tight">
                  {bestLaptop.name}
                </h3>
                <p className="text-xs text-[#7D5D73] font-medium">
                  {bestLaptop.specsText || `${bestLaptop.cpu} • ${bestLaptop.ram} • ${bestLaptop.storage}`}
                </p>
              </div>

              {/* Price Badge */}
              <div className="text-left sm:text-right shrink-0 bg-white px-4 py-3 rounded-2xl border border-[#FEC5E7] shadow-xs">
                <div className="text-[10px] uppercase tracking-wider text-[#FA80B1] font-bold">
                  Harga Pasar
                </div>
                <div className="font-heading text-base sm:text-xl font-extrabold text-[#3A2334]">
                  {formatRupiah(bestLaptop.price)}
                </div>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-white/85 p-3.5 rounded-2xl border border-[#FDE2E4]">
              <div className="flex items-center gap-2 text-[#3A2334]">
                <Cpu className="w-4 h-4 text-[#FA80B1] shrink-0" />
                <span className="truncate font-semibold">{bestLaptop.cpu}</span>
              </div>
              <div className="flex items-center gap-2 text-[#3A2334]">
                <HardDrive className="w-4 h-4 text-[#FA80B1] shrink-0" />
                <span className="truncate font-semibold">{bestLaptop.ram}</span>
              </div>
              <div className="flex items-center gap-2 text-[#3A2334]">
                <Zap className="w-4 h-4 text-[#FA80B1] shrink-0" />
                <span className="truncate font-semibold">{bestLaptop.battery || 'Baterai'}</span>
              </div>
              <div className="flex items-center gap-2 text-[#3A2334]">
                <ShieldCheck className="w-4 h-4 text-[#FA80B1] shrink-0" />
                <span className="truncate font-semibold">{bestLaptop.warranty || 'Garansi'}</span>
              </div>
            </div>

            {/* VIKOR Metrics Box (S, R, Q) */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-white/90 p-3 rounded-2xl border border-[#FDE2E4]">
                <div className="text-[10px] font-semibold text-[#7D5D73] uppercase tracking-wider">
                  Utilitas (S)
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[#3A2334] mt-0.5">
                  {bestLaptop.S.toFixed(4)}
                </div>
              </div>

              <div className="bg-white/90 p-3 rounded-2xl border border-[#FDE2E4]">
                <div className="text-[10px] font-semibold text-[#7D5D73] uppercase tracking-wider">
                  Regret (R)
                </div>
                <div className="font-mono text-xs sm:text-sm font-bold text-[#3A2334] mt-0.5">
                  {bestLaptop.R.toFixed(4)}
                </div>
              </div>

              <div className="bg-[#FA80B1] p-3 rounded-2xl text-white shadow-xs">
                <div className="text-[10px] font-heading font-bold uppercase tracking-wider opacity-95">
                  Indeks Q
                </div>
                <div className="font-mono text-sm sm:text-base font-extrabold mt-0.5">
                  {bestLaptop.Q.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Runner-Up Cards: Rank #2 (#FEC5E7) & Rank #3 (#E4BDFE) */}
      {runnerUps.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {runnerUps.map((laptop, idx) => {
            const isRank2 = laptop.rank === 2;
            const isCompromise = compromiseSolution.some((alt) => alt.id === laptop.id);
            const accentHex = isRank2 ? '#FEC5E7' : '#E4BDFE';

            return (
              <div
                key={laptop.id}
                data-aos="fade-up"
                data-aos-delay={100 + idx * 70}
                className="bg-white rounded-3xl border border-[#F3D5E3] shadow-pastel p-5 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#FA80B1]"
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    style={{ backgroundColor: accentHex }}
                    className="inline-flex items-center gap-1 text-[10px] font-heading font-extrabold text-[#3A2334] px-2.5 py-1 rounded-full uppercase"
                  >
                    <Award className="w-3 h-3" />
                    Peringkat #{laptop.rank}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {isCompromise && !isUniqueBest && (
                      <span className="text-[10px] font-semibold text-[#3A2334] bg-[#FFF1E6] border border-[#FEC5E7] px-2 py-0.5 rounded-full">
                        Kompromi
                      </span>
                    )}
                    <span className="font-mono text-xs text-[#7D5D73] font-bold">
                      {laptop.code}
                    </span>
                  </div>
                </div>

                {/* Laptop Info */}
                <div className="space-y-1">
                  <h4 className="font-heading text-sm sm:text-base font-bold text-[#3A2334] truncate">
                    {laptop.name}
                  </h4>
                  <p className="text-[11px] text-[#7D5D73] truncate">
                    {laptop.specsText || `${laptop.cpu} • ${laptop.ram}`}
                  </p>
                  <div className="font-heading text-sm font-extrabold text-[#FA80B1] pt-1">
                    {formatRupiah(laptop.price)}
                  </div>
                </div>

                {/* Metrics */}
                <div className="pt-3 border-t border-[#FDE2E4] grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="bg-[#FFF8F3] p-2 rounded-xl border border-[#F3D5E3]/70">
                    <span className="text-[#7D5D73] block">S</span>
                    <span className="font-mono font-bold text-[#3A2334]">
                      {laptop.S.toFixed(4)}
                    </span>
                  </div>
                  <div className="bg-[#FFF8F3] p-2 rounded-xl border border-[#F3D5E3]/70">
                    <span className="text-[#7D5D73] block">R</span>
                    <span className="font-mono font-bold text-[#3A2334]">
                      {laptop.R.toFixed(4)}
                    </span>
                  </div>
                  <div
                    style={{ backgroundColor: accentHex }}
                    className="p-2 rounded-xl text-[#3A2334]"
                  >
                    <span className="font-heading font-bold block">Q</span>
                    <span className="font-mono font-extrabold">
                      {laptop.Q.toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
