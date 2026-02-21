"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SwarmIntelligence() {
  const data = [
    { name: "Growth", Growth: 35, Runy: 28, Market: 32 },
    { name: "Runy", Growth: 48, Runy: 45, Market: 38 },
    { name: "Market", Growth: 62, Runy: 58, Market: 51 },
    { name: "Peak", Growth: 75, Runy: 72, Market: 68 },
    { name: "Assert", Growth: 88, Runy: 85, Market: 82 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass p-8 col-span-1 lg:col-span-2 hover:border-emerald-400/30 transition-colors duration-300 animate-glow-pulse"
    >
      <h2 className="text-xl font-semibold tracking-tighter text-slate-50 mb-6">
        Swarm Intelligence
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22ff88" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22ff88" stopOpacity={0.1} />
            </linearGradient>
            <filter id="glowEffect">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148, 163, 184, 0.1)"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            stroke="rgba(148, 163, 184, 0.3)"
            style={{ fontSize: "12px" }}
          />

          <YAxis
            stroke="rgba(148, 163, 184, 0.3)"
            style={{ fontSize: "12px" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(34, 255, 136, 0.3)",
              borderRadius: "8px",
              boxShadow: "0 0 20px -4px #22ff88",
            }}
            labelStyle={{ color: "#22ff88" }}
            formatter={(value) => `${value}%`}
          />

          <Line
            type="monotone"
            dataKey="Growth"
            stroke="#22ff88"
            strokeWidth={3}
            dot={{ fill: "#22ff88", r: 5 }}
            activeDot={{ r: 7, fill: "#4ade80" }}
            filter="url(#glowEffect)"
            isAnimationActive={true}
            animationDuration={1200}
            name="Growth"
          />

          <Line
            type="monotone"
            dataKey="Runy"
            stroke="#4ade80"
            strokeWidth={2}
            dot={{ fill: "#4ade80", r: 4 }}
            strokeOpacity={0.5}
            isAnimationActive={true}
            animationDuration={1200}
            name="Runy"
          />

          <Line
            type="monotone"
            dataKey="Market"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981", r: 4 }}
            strokeOpacity={0.4}
            isAnimationActive={true}
            animationDuration={1200}
            name="Market"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 flex gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
          <span className="text-xs text-slate-400">Growth</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40" />
          <span className="text-xs text-slate-400">Runy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-600" />
          <span className="text-xs text-slate-400">Market</span>
        </div>
      </div>
    </motion.div>
  );
}
