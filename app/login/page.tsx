'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, ShieldCheck, Play, Zap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ultra-dense twinkling nebula starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true })!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Star { x: number; y: number; size: number; speed: number; opacity: number; twinkleSpeed: number; hue: number; }
    const stars: Star[] = [];
    for (let i = 0; i < 280; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.8 + 0.6,
        speed: Math.random() * 0.6 + 0.1,
        opacity: Math.random() * 0.9 + 0.3,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        hue: Math.random() > 0.7 ? 160 : 190, // emerald + cyan mix
      });
    }

    let time = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(2,6,23,0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.y += star.speed;
        star.opacity = 0.4 + Math.sin(time * star.twinkleSpeed) * 0.6;

        ctx.fillStyle = `hsla(${star.hue}, 100%, 92%, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        if (star.y > canvas.height) star.y = 0;
      });
      time += 0.8;
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/dashboard');
    });
  }, [router, supabase.auth]);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
    else setMessage('🚀 Magic link launched into hyperspace. Check inbox + spam.');
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const launchDemo = () => {
    setDemoLoading(true);
    localStorage.setItem('apex_demo_mode', 'true');
    router.push('/dashboard?demo=true');
    setDemoLoading(false);
  };

  return (
    <div className="cosmic-bg min-h-screen flex items-center justify-center p-6 overflow-hidden relative">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card w-full max-w-md p-14 rounded-3xl neon-emerald relative z-10 overflow-hidden"
      >
        {/* Holographic rim pulse */}
        <div className="absolute inset-0 rounded-3xl border border-[#22ff88]/30 animate-[pulse-glow_4s_ease-in-out_infinite]" />

        {/* Logo with orbiting energy rings */}
        <motion.div 
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="mx-auto mb-8 relative w-28 h-28"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#22ff88] via-[#4ade80] to-[#67e8f9] rounded-3xl flex items-center justify-center shadow-[0_0_120px_rgba(34,255,136,0.9)]">
            <span className="text-black text-8xl font-black tracking-[-6px]">A</span>
          </div>
          {/* Orbiting rings */}
          <div className="absolute inset-[-18px] border border-[#22ff88]/40 rounded-full animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-[-32px] border border-[#67e8f9]/30 rounded-full animate-[spin_18s_linear_infinite_reverse]" />
        </motion.div>

        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold tracking-[-3px] bg-gradient-to-r from-white via-[#22ff88] to-white bg-clip-text text-transparent">ApexService</h1>
          <p className="text-emerald-400 text-2xl font-medium mt-3 tracking-tight">2030 has arrived.<br />Jobber just died.</p>
        </div>

        <AnimatePresence>
          {message && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 p-5 rounded-3xl mb-8 text-center font-medium">{message}</motion.div>}
          {error && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-950/70 border border-red-400/40 text-red-300 p-5 rounded-3xl mb-8 text-center">{error}</motion.div>}
        </AnimatePresence>

        <form onSubmit={handleMagicLink} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2 tracking-widest">✉️ WORK EMAIL 📧</label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@hvactitan.com"
                required
                className="w-full px-7 py-6 bg-slate-950/80 border border-slate-700 rounded-3xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#22ff88] focus:ring-4 focus:ring-[#22ff88]/30 text-xl transition-all group-focus-within:shadow-[0_0_40px_rgba(34,255,136,0.3)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="group w-full bg-gradient-to-r from-[#22ff88] to-[#4ade80] hover:from-[#4ade80] hover:to-[#22ff88] text-black font-bold py-6 rounded-3xl text-2xl flex items-center justify-center gap-4 transition-all hover:shadow-[0_0_80px_rgba(34,255,136,0.8)] active:scale-[0.985] disabled:opacity-60 relative overflow-hidden"
          >
            <span>{loading ? 'LAUNCHING...' : '🚀 SEND MAGIC LINK'}</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            {loading && <div className="absolute inset-0 bg-white/20 animate-[pulse_0.8s_infinite]" />}
          </button>
        </form>

        <div className="my-10 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          <span className="px-8 text-slate-400 text-sm font-medium tracking-[3px]">OR</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full glass-card py-6 px-6 rounded-3xl flex items-center justify-center gap-4 hover:neon-emerald text-xl font-medium transition-all active:scale-[0.985]"
        >
          🔵 Continue with Google
        </button>

        <motion.button
          onClick={launchDemo}
          disabled={demoLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 w-full border border-[#22ff88]/60 hover:border-[#22ff88] py-6 rounded-3xl flex items-center justify-center gap-4 text-[#22ff88] font-medium text-xl hover:bg-[#22ff88]/10 transition-all active:scale-[0.985]"
        >
          ▶️ Launch Instant Demo
        </motion.button>

        <div className="mt-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2 tracking-widest">
          🛡️ BANK-LEVEL ENCRYPTION • ZERO DATA LEAKS • TRUSTED BY 2030 LEGENDS
        </div>
      </motion.div>
    </div>
  );
}