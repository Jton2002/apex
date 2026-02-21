"use client";

import { Home, Users, Calendar, FileText, Truck, UserCircle, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 glass border-r border-slate-700/30 flex flex-col items-center justify-start gap-8 py-8 z-50">
      {/* Logo placeholder */}
      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
        <div className="w-6 h-6 rounded-md bg-emerald-400 animate-pulse" />
      </div>

      {/* Navigation icons */}
      <nav className="flex flex-col gap-6">
        {/* Home - Active with emerald glow */}
        <button
          className="p-3 rounded-lg transition-all duration-300 hover:scale-110 group relative"
          title="Dashboard"
        >
          <Home
            className="w-6 h-6 text-emerald-400 transition-all"
            fill="currentColor"
            strokeWidth={1.5}
          />
          <div className="absolute inset-0 rounded-lg bg-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </button>

        {/* Users */}
        <button
          className="p-3 rounded-lg text-slate-500 hover:text-slate-300 transition-all duration-300 hover:scale-110 hover:bg-slate-800/20"
          title="Users"
        >
          <Users className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Calendar */}
        <button
          className="p-3 rounded-lg text-slate-500 hover:text-slate-300 transition-all duration-300 hover:scale-110 hover:bg-slate-800/20"
          title="Calendar"
        >
          <Calendar className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Documents */}
        <button
          className="p-3 rounded-lg text-slate-500 hover:text-slate-300 transition-all duration-300 hover:scale-110 hover:bg-slate-800/20"
          title="Documents"
        >
          <FileText className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Fleet/Vehicles */}
        <button
          className="p-3 rounded-lg text-slate-500 hover:text-slate-300 transition-all duration-300 hover:scale-110 hover:bg-slate-800/20"
          title="Fleet"
        >
          <Truck className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Profile */}
        <button
          className="p-3 rounded-lg text-slate-500 hover:text-slate-300 transition-all duration-300 hover:scale-110 hover:bg-slate-800/20"
          title="Profile"
        >
          <UserCircle className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Settings */}
        <button
          className="p-3 rounded-lg text-slate-500 hover:text-slate-300 transition-all duration-300 hover:scale-110 hover:bg-slate-800/20"
          title="Settings"
        >
          <Settings className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </nav>

      {/* Bottom accent */}
      <div className="mt-auto p-3">
        <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
      </div>
    </aside>
  );
}
