import React, { useState } from 'react';
import { Slide } from '../../types/presentation';
import { ThemeStyles } from '../ThemeManager';
import { Sliders, Calculator, Zap } from 'lucide-react';

interface Props {
  slide: Slide;
  theme: ThemeStyles;
}

export const InteractiveSimulatorSlide: React.FC<Props> = ({ slide, theme }) => {
  const { data } = slide;
  const simType = data.baseCalculationType || 'traffic_congestion';

  // State for Traffic Simulation
  const [transitShiftPct, setTransitShiftPct] = useState<number>(35); // 10% - 60%
  const [busElectrificationPct, setBusElectrificationPct] = useState<number>(80); // 0% - 100%
  const [peakPricingTier, setPeakPricingTier] = useState<number>(5); // $1 - $10

  // State for ROI Tech Simulation
  const [revenueMillion, setRevenueMillion] = useState<number>(120);
  const [inventoryMillion, setInventoryMillion] = useState<number>(25);
  const [aiAccuracyPct, setAiAccuracyPct] = useState<number>(92);

  // State for Clean Energy Simulation
  const [bessCapacityMWh, setBessCapacityMWh] = useState<number>(3500);
  const [reSharePct, setReSharePct] = useState<number>(45);

  return (
    <div className="w-full h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wider uppercase">
          <span className={theme.highlightKicker}>{slide.categoryKicker || '05. SCENARIO SIMULATOR'}</span>
          <span className={theme.mutedColor}>·</span>
          <span className={theme.mutedColor}>Live Predictive Modeling</span>
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

      {/* Simulator Interface Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-stretch">
        {/* Left Side: Dynamic Controls / Sliders */}
        <div className={`lg:col-span-6 p-6 rounded-xl border ${theme.cardBorder} ${theme.cardBg} space-y-5 flex flex-col justify-between`}>
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>{data.simulatorTitle || 'Simulation Parameter Control'}</span>
            </div>
            <span className="text-[11px] font-mono text-stone-400">Live Feedback</span>
          </div>

          {/* Traffic Congestion Controls */}
          {simType === 'traffic_congestion' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-300">Public Transit Mode Shift Rate:</span>
                  <span className="font-mono text-amber-400 font-bold text-sm">{transitShiftPct}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="65"
                  step="1"
                  value={transitShiftPct}
                  onChange={(e) => setTransitShiftPct(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>10% (Baseline)</span>
                  <span>35% (2028 Target)</span>
                  <span>65% (Optimal 2035)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-300">Transit Fleet Electrification Share:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">{busElectrificationPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={busElectrificationPct}
                  onChange={(e) => setBusElectrificationPct(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>0% Fossil Diesel</span>
                  <span>100% Zero-Emission Fleet</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-300">Peak-Hour Downtown Cordon Toll:</span>
                  <span className="font-mono text-cyan-400 font-bold text-sm">${peakPricingTier} / vehicle trip</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={peakPricingTier}
                  onChange={(e) => setPeakPricingTier(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Clean Energy Controls */}
          {simType === 'carbon_reduction' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-300">Utility-Scale BESS Storage Capacity:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">{bessCapacityMWh.toLocaleString()} MWh</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="8000"
                  step="250"
                  value={bessCapacityMWh}
                  onChange={(e) => setBessCapacityMWh(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-300">Renewable Energy Grid Penetration:</span>
                  <span className="font-mono text-amber-400 font-bold text-sm">{reSharePct}% total generation</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  step="2"
                  value={reSharePct}
                  onChange={(e) => setReSharePct(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Supply Chain / ROI Controls */}
          {simType === 'roi_tech' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-300">Annual Enterprise Revenue:</span>
                  <span className="font-mono text-cyan-400 font-bold text-sm">${revenueMillion}M USD</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="10"
                  value={revenueMillion}
                  onChange={(e) => setRevenueMillion(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-300">Average Inventory Carrying Asset Value:</span>
                  <span className="font-mono text-amber-400 font-bold text-sm">${inventoryMillion}M USD</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={inventoryMillion}
                  onChange={(e) => setInventoryMillion(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-stone-300">Deep Learning Demand Forecast Accuracy:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">{aiAccuracyPct}%</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="98"
                  step="1"
                  value={aiAccuracyPct}
                  onChange={(e) => setAiAccuracyPct(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-stone-800 rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="text-[11px] text-stone-400 pt-2 border-t border-white/5 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            <span>Real-time econometric simulation algorithm</span>
          </div>
        </div>

        {/* Right Side: Real-Time Calculated Outcomes */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          {simType === 'traffic_congestion' && (
            <>
              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Peak-Hour Delay Reduction</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-amber-400 my-2">
                  -{Math.round((transitShiftPct * 0.85) + (peakPricingTier * 1.5))}%
                </div>
                <div className="text-xs text-stone-300">
                  Corridor velocity increased from 14km/h to {Math.round(14 + (transitShiftPct * 0.28))} km/h
                </div>
              </div>

              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Productive Hours Saved</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-emerald-400 my-2">
                  +{Math.round(transitShiftPct * 1.35)}M
                </div>
                <div className="text-xs text-stone-300">
                  Million citizen productive hours reclaimed annually
                </div>
              </div>

              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Carbon Abatement</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-cyan-400 my-2">
                  -{Math.round((transitShiftPct * 12) + (busElectrificationPct * 4.5))}K
                </div>
                <div className="text-xs text-stone-300">
                  Thousand metric tons of CO2 eliminated per year
                </div>
              </div>

              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Net Economic Value</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-white my-2">
                  ${Math.round(transitShiftPct * 18.5 + (peakPricingTier * 3.2))}M
                </div>
                <div className="text-xs text-stone-300">
                  Direct healthcare, fuel, and time savings
                </div>
              </div>
            </>
          )}

          {simType === 'carbon_reduction' && (
            <>
              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Thermal Coal Displaced</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-emerald-400 my-2">
                  {Math.round((bessCapacityMWh * 0.95) + (reSharePct * 45))}K
                </div>
                <div className="text-xs text-stone-300">Metric tons of imported coal avoided</div>
              </div>

              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">CO2 Emissions Abated</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-cyan-400 my-2">
                  {((bessCapacityMWh * 0.0018) + (reSharePct * 0.12)).toFixed(1)}M
                </div>
                <div className="text-xs text-stone-300">Million metric tons of CO2 kept from atmosphere</div>
              </div>

              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Avoided Fuel Outflow</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-amber-400 my-2">
                  ${Math.round((bessCapacityMWh * 0.045) + (reSharePct * 3.2))}M
                </div>
                <div className="text-xs text-stone-300">Million USD in foreign exchange retained</div>
              </div>

              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Grid Reliability Rate</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-white my-2">
                  99.98%
                </div>
                <div className="text-xs text-stone-300">Zero load shedding or blackout vulnerability</div>
              </div>
            </>
          )}

          {simType === 'roi_tech' && (
            <>
              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Working Capital Released</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-emerald-400 my-2">
                  ${(inventoryMillion * (aiAccuracyPct - 60) * 0.008).toFixed(1)}M
                </div>
                <div className="text-xs text-stone-300">Freed cash to reinvest in core growth</div>
              </div>

              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Payback Period</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-amber-400 my-2">
                  {(6.5 - ((aiAccuracyPct - 70) * 0.12)).toFixed(1)} Mo
                </div>
                <div className="text-xs text-stone-300">Full capital investment breakeven</div>
              </div>

              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">Logistics Cost Reduction</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-cyan-400 my-2">
                  -{Math.round((aiAccuracyPct - 70) * 0.9 + 8)}%
                </div>
                <div className="text-xs text-stone-300">Route consolidation and avoided demurrage</div>
              </div>

              <div className={`p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
                <div className="text-xs uppercase tracking-wider text-stone-400">On-Time In-Full (OTIF)</div>
                <div className="text-3xl lg:text-4xl font-mono font-bold text-white my-2">
                  {Math.min(99.5, Number((82 + (aiAccuracyPct * 0.18)).toFixed(1)))}%
                </div>
                <div className="text-xs text-stone-300">Customer net retention rate improvement</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Sub-strip */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Presenter may invite stakeholders to test custom input assumptions</span>
        </div>
        <div className="font-mono text-[11px]">Monte Carlo Sensitivity: 10,000 Iterations</div>
      </div>
    </div>
  );
};
