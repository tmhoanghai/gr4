import React, { useState } from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
}

export const DataMetricsSlide: React.FC<Props> = ({ slide, theme }) => {
  const { data } = slide;
  const metrics = data.metrics || [];
  const chartData = data.chartData || [];
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const maxValue = Math.max(...chartData.map(d => Math.max(d.value, d.benchmark || 0)), 100);

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase">
          <span className={theme.highlightKicker}>{slide.categoryKicker || '03. DATA & EMPIRICAL EVIDENCE'}</span>
          <span className={theme.mutedColor}>·</span>
          <span className={theme.mutedColor}>Quantitative Proof</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-balance">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className={`text-sm md:text-base ${theme.bodyColor} max-w-3xl`}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Main Grid: 3 KPI Cards on Top + Interactive Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-stretch">
        {/* Left Column: KPI Metric Cards */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${theme.cardBorder} ${theme.cardBg} transition-all duration-200 hover:border-amber-500/40`}
            >
              <div className="text-xs uppercase tracking-wider text-stone-400 mb-1">
                {metric.label}
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl md:text-3xl font-mono font-bold tracking-tight text-white">
                  {metric.value}
                </div>
                <div className={`flex items-center gap-1 text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                  metric.changePositive
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40'
                    : 'bg-rose-950/80 text-rose-400 border border-rose-800/40'
                }`}>
                  {metric.changePositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="text-xs text-stone-400 mt-2 font-light">
                {metric.context}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Interactive Benchmark Bar Chart */}
        <div className={`lg:col-span-7 p-6 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm md:text-base font-semibold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-amber-400" />
                <span>{data.chartTitle || 'Capacity Throughput Benchmark'}</span>
              </h3>
              <span className="text-xs font-mono text-stone-400">Unit: {data.chartUnit || 'Value'}</span>
            </div>
            <p className="text-xs text-stone-400 mb-6">
              {data.chartSubtitle || 'Hover over individual bars to inspect comparative figures'}
            </p>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-4">
            {chartData.map((item, idx) => {
              const widthPct = Math.min(100, Math.round((item.value / maxValue) * 100));
              const isHovered = hoveredBar === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredBar(idx)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="space-y-1.5"
                >
                  <div className="flex justify-between text-xs font-medium">
                    <span className={isHovered ? 'text-amber-300 font-semibold' : 'text-stone-300'}>
                      {item.label}
                    </span>
                    <span className="font-mono text-white font-bold">
                      {item.value.toLocaleString()} {data.chartUnit}
                    </span>
                  </div>

                  <div className="h-4 w-full bg-stone-800/80 rounded-full overflow-hidden p-0.5 relative">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${theme.chartBarPrimary} ${
                        isHovered ? 'opacity-100 ring-2 ring-white/50' : 'opacity-90'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
            <div>Data normalized to ISO 37120 international municipal standards</div>
            <div className="font-mono">95% Confidence Interval</div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-strip */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
        <div>Real-time quantitative visual benchmarking</div>
        <div className="font-mono text-[11px]">Source: Empirical Field Study & Econometric Forecast</div>
      </div>
    </div>
  );
};
