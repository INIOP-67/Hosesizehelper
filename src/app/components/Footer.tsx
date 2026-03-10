import { Heart, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const SIZES = [
  { hun: 3, inch: '3/8"', mm: '9.5' },
  { hun: 4, inch: '1/2"', mm: '12.7' },
  { hun: 5, inch: '5/8"', mm: '15.8' },
  { hun: 6, inch: '3/4"', mm: '19.0' },
  { hun: 8, inch: '1"', mm: '25.4' },
];

export function Footer() {
  return (
    <footer className="relative pt-1 border-t border-slate-800/50 bg-[#0f172a]">
      {/* Divider gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 max-w-2xl py-12">

        {/* Logo + tagline */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-sky-500 shadow-[0_4px_15px_rgba(16,185,129,0.3)]">
              <span className="text-[1.1rem]">🪠</span>
            </div>
            <span className="text-white font-extrabold text-[1.1rem] tracking-tight">
              สายยางกี่หุนดี
            </span>
            <span className="px-2 py-0.5 rounded text-[0.6rem] font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              BETA
            </span>
          </div>
          <p className="text-[0.85rem] text-slate-400 leading-relaxed max-w-sm">
            เครื่องมือแนะนำขนาดสายยางสำหรับก๊อกน้ำ<br />Hose Size Helper for Thai homeowners
          </p>
        </div>

        {/* Reference table */}
        <div className="rounded-2xl p-5 mb-10 glass-panel border-slate-700/50 bg-slate-800/30">
          <p className="text-[0.72rem] text-slate-500 font-bold mb-4 tracking-widest uppercase text-center">
            ตารางขนาดมาตรฐาน
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SIZES.map((s) => (
              <div
                key={s.hun}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors"
              >
                <span className="text-emerald-400 font-bold text-[0.88rem]">{s.hun} หุน</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-300 text-[0.82rem] font-medium">{s.inch}</span>
                  <span className="text-slate-600 text-[0.75rem]">•</span>
                  <span className="text-slate-400 text-[0.82rem] font-medium">{s.mm} mm</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/50 pt-6">
          <div className="flex items-center gap-2 text-[0.78rem] text-slate-400 font-medium">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={14} className="text-emerald-500" fill="currentColor" />
            </motion.div>
            <span>for Thai homeowners</span>
          </div>
          <p className="text-[0.72rem] text-slate-500 font-medium">
            © 2026 สายยางกี่หุนดี · ใช้ฟรีตลอดไป
          </p>
        </div>
      </div>
    </footer>
  );
}
