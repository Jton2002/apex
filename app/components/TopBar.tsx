"use client";

import { Zap, Brain } from "lucide-react";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-20 right-0 h-20 glass border-b border-slate-700/30 flex items-center justify-between px-8 z-40">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-black">
          A
        </div>

        {/* Title */}
        <div className="flex flex-col gap-0">
          <h1 className="text-xl font-semibold tracking-tighter text-slate-50">
            ApexService
          </h1>
          <p className="text-xs text-slate-400">HVAC TradeMorph</p>
        </div>
      </div>

      {/* Right side badges */}
      <div className="flex items-center gap-3">
        {/* AI Badge */}
        <div className="badge-premium flex items-center gap-2">
          <Brain className="w-4 h-4" />
          ApexMiow AI
        </div>

        {/* Status Badge */}
        <div className="badge-premium flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Adaptive Learning Active
        </div>
      </div>
    </header>
  );
}
