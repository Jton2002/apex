// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
// Import your KPICards, Sidebar, SwarmIntelligence, HankAIPersona, TopBar etc.

export default function Dashboard() {
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const demoParam = searchParams.get('demo');
      const demoStorage = localStorage.getItem('apex_demo_mode');

      if (demoParam === 'true' || demoStorage === 'true') {
        setIsDemo(true);
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, searchParams, supabase.auth]);

  if (loading) {
    return (
      <div className="cosmic-bg min-h-screen flex items-center justify-center">
        <div className="text-emerald-400 text-xl">Loading ApexService...</div>
      </div>
    );
  }

  return (
    <div className="cosmic-bg min-h-screen text-white overflow-hidden">
      {isDemo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-900/80 border border-emerald-400/30 text-emerald-300 px-4 py-2 text-center text-sm"
        >
          🚀 Demo Mode Active - All features unlocked for testing
        </motion.div>
      )}

      {/* Sidebar */}
      {/* TopBar */}
      <main className="pt-20 pl-20 pr-8 pb-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">ApexService Dashboard</h1>
          <p className="text-emerald-400 text-xl">
            {isDemo ? 'Demo Mode - Explore all features!' : 'Welcome to your FSM platform'}
          </p>
        </div>
        {/* KPI Cards */}
        {/* Grid with Swarm + Hank */}
      </main>
    </div>
  );
}