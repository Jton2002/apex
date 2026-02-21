import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="cosmic-bg min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <div className="w-20 h-20 bg-[#22ff88] rounded-2xl flex items-center justify-center text-black font-bold text-3xl mx-auto mb-8">
          A
        </div>
        <h1 className="text-4xl font-bold mb-4">ApexService</h1>
        <p className="text-xl text-slate-300 mb-8">HVAC TradeMorph Platform</p>
        <Link
          href="/login"
          className="inline-block px-8 py-3 bg-[#22ff88] text-black font-semibold rounded-xl hover:bg-[#4ade80] transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
