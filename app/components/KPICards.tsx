"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  unit?: string;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

function KPICard({
  title,
  value,
  unit,
  change,
  isPositive = true,
  icon,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass p-6 min-w-fit hover:border-emerald-400/30 transition-colors duration-300 animate-glow-pulse"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-400 mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tighter text-slate-50">
              {value}
            </h3>
            {unit && <span className="text-sm text-slate-400">{unit}</span>}
          </div>
          {change && (
            <p
              className={`text-sm font-semibold mt-2 flex items-center gap-1 ${
                isPositive ? "text-emerald-400 neon-text" : "text-red-400"
              }`}
            >
              {isPositive ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-emerald-400 opacity-60">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function KPICards() {
  const kpis = [
    {
      title: "Revenue",
      value: "$28,450",
      unit: "USD",
      change: "+27%",
      isPositive: true,
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      title: "AI-Saved Hours",
      value: "18",
      change: "This month ↑",
      isPositive: true,
    },
    {
      title: "Adaptation Score",
      value: "97%",
      change: "+12% this week",
      isPositive: true,
    },
    {
      title: "Profit Ghost Uplift",
      value: "$5,392",
      unit: "USD",
      change: "Net margin",
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, idx) => (
        <motion.div key={idx} transition={{ delay: idx * 0.1 }}>
          <KPICard {...kpi} />
        </motion.div>
      ))}
    </div>
  );
}
