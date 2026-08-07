/* src/crm/components/ChartComponents.jsx */
import React from "react";

// Sales & Revenue Bar Chart
export const BarChart = ({ data, color = "#062b23" }) => {
  const maxVal = Math.max(...data.map((d) => d.value), 10);

  return (
    <div className="w-full h-64 flex flex-col justify-end pt-6">
      <div className="flex-1 flex items-end gap-3 px-2">
        {data.map((item, idx) => {
          const heightPct = Math.round((item.value / maxVal) * 100);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <div className="text-[10px] font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-2 py-0.5 rounded shadow">
                {item.formattedValue || item.value}
              </div>
              <div
                style={{ height: `${heightPct}%`, backgroundColor: item.color || color }}
                className="w-full rounded-t-lg transition-all duration-500 hover:brightness-110 shadow-sm relative"
              />
              <span className="text-[11px] font-semibold text-gray-600 truncate max-w-full">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Property Status Donut / Ring Breakdown
export const StatusDonutChart = ({ available, sold, rented, featured }) => {
  const total = available + sold + rented || 1;
  const availPct = Math.round((available / total) * 100);
  const soldPct = Math.round((sold / total) * 100);
  const rentedPct = 100 - availPct - soldPct;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
      {/* Donut SVG */}
      <div className="relative w-40 h-40 flex items-center justify-center flex-shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-100"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Available */}
          <path
            className="text-emerald-500 transition-all duration-1000"
            strokeDasharray={`${availPct}, 100`}
            strokeWidth="4"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Sold */}
          <path
            className="text-amber-500 transition-all duration-1000"
            strokeDasharray={`${soldPct}, 100`}
            strokeDashoffset={`-${availPct}`}
            strokeWidth="4"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold text-[#062b23]">{total}</span>
          <span className="text-[10px] uppercase font-bold text-gray-400">Total</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-3 w-full">
        <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-3 h-3 rounded-full bg-emerald-500" /> Available
          </div>
          <span className="font-bold text-sm">{available} ({availPct}%)</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-100">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-3 h-3 rounded-full bg-amber-500" /> Sold
          </div>
          <span className="font-bold text-sm">{sold} ({soldPct}%)</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-3 h-3 rounded-full bg-blue-500" /> Rented
          </div>
          <span className="font-bold text-sm">{rented} ({Math.max(0, rentedPct)}%)</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50 text-purple-900 border border-purple-100">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="w-3 h-3 rounded-full bg-purple-500" /> Featured
          </div>
          <span className="font-bold text-sm">{featured}</span>
        </div>
      </div>
    </div>
  );
};
