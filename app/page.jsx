'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        window.location.replace('/dashboard');
      } else {
        window.location.replace('/auth');
      }
    }
    checkSession();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02040a]">
      <div className="relative">
        <div className="absolute inset-0 bg-[#3a86ff] rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="relative w-12 h-12 border-4 border-t-[#3a86ff] border-white/5 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
