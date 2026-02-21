'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

export default function AuthCallback() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth callback error:', error);
        router.push('/login?error=auth_callback_error');
        return;
      }

      if (data.session) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };

    handleAuthCallback();
  }, [router, supabase.auth]);

  return (
    <div className="cosmic-bg min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-2xl text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-black text-3xl font-black">A</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Authenticating...</h2>
        <p className="text-emerald-400">Welcome to ApexService</p>
        <div className="mt-4">
          <div className="w-6 h-6 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin mx-auto"></div>
        </div>
      </motion.div>
    </div>
  );
}