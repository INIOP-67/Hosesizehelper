import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onCTAClick: () => void;
}

function FaucetHoseIllustration() {
  return (
    <svg
      viewBox="0 0 320 180"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="faucet and hose illustration"
      style={{ width: '100%', maxWidth: '320px', height: 'auto' }}
    >
      <g>
        {/* Wall */}
        <rect x="0" y="15" width="52" height="150" rx="6" fill="#e2e8f0" />
        <rect x="4" y="19" width="44" height="142" rx="4" fill="#cbd5e1" />
        <rect x="8" y="40" width="8" height="8" rx="2" fill="#94a3b8" />
        <rect x="8" y="60" width="8" height="8" rx="2" fill="#94a3b8" />
        <rect x="8" y="80" width="8" height="8" rx="2" fill="#94a3b8" />
        <rect x="8" y="100" width="8" height="8" rx="2" fill="#94a3b8" />
        <rect x="8" y="120" width="8" height="8" rx="2" fill="#94a3b8" />
        <rect x="8" y="140" width="8" height="8" rx="2" fill="#94a3b8" />
        {/* Horizontal supply pipe */}
        <rect x="44" y="72" width="48" height="20" rx="8" fill="#94a3b8" />
        <rect x="46" y="74" width="44" height="16" rx="6" fill="#b0bec5" />
        <rect x="48" y="75" width="40" height="5" rx="3" fill="#d1d5db" opacity="0.5" />
        {/* Faucet body */}
        <rect x="74" y="50" width="32" height="60" rx="10" fill="#475569" />
        <rect x="77" y="52" width="26" height="56" rx="8" fill="#64748b" />
        <rect x="79" y="54" width="12" height="50" rx="6" fill="#94a3b8" opacity="0.3" />
        {/* Handle base */}
        <rect x="82" y="42" width="16" height="12" rx="4" fill="#374151" />
        {/* Handle */}
        <rect x="70" y="36" width="40" height="10" rx="5" fill="#10B981" />
        <rect x="72" y="37" width="36" height="7" rx="4" fill="#34d399" />
        <rect x="74" y="38" width="28" height="3" rx="2" fill="#6ee7b7" opacity="0.5" />
        <circle cx="90" cy="41" r="4" fill="#059669" />
        <circle cx="90" cy="41" r="2" fill="#10B981" />
        {/* Spout */}
        <rect x="90" y="100" width="42" height="16" rx="7" fill="#475569" />
        <rect x="92" y="102" width="38" height="12" rx="5" fill="#64748b" />
        <rect x="94" y="103" width="30" height="4" rx="2" fill="#94a3b8" opacity="0.3" />
        {/* Hose connector */}
        <circle cx="132" cy="108" r="12" fill="#334155" />
        <circle cx="132" cy="108" r="9" fill="#10B981" />
        <circle cx="132" cy="108" r="6" fill="#34d399" />
        <circle cx="132" cy="108" r="3" fill="#d1fae5" />
        {/* Hose */}
        <path d="M 144 108 C 165 108 168 130 185 130 C 202 130 202 95 218 95 C 234 95 232 118 248 115"
          fill="none" stroke="#10B981" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 144 108 C 165 108 168 130 185 130 C 202 130 202 95 218 95 C 234 95 232 118 248 115"
          fill="none" stroke="#34d399" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 144 108 C 165 108 168 130 185 130 C 202 130 202 95 218 95 C 234 95 232 118 248 115"
          fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 8" />
        {/* Nozzle */}
        <rect x="244" y="107" width="36" height="18" rx="7" fill="#047857" />
        <rect x="246" y="109" width="32" height="14" rx="5" fill="#059669" />
        <rect x="250" y="111" width="2" height="10" rx="1" fill="#34d399" opacity="0.5" />
        <rect x="255" y="111" width="2" height="10" rx="1" fill="#34d399" opacity="0.5" />
        <rect x="260" y="111" width="2" height="10" rx="1" fill="#34d399" opacity="0.5" />
        <rect x="278" y="110" width="8" height="12" rx="4" fill="#065f46" />
        {/* Water droplets */}
        <ellipse cx="293" cy="108" rx="4" ry="6" fill="#38BDF8" opacity="0.9" />
        <ellipse cx="302" cy="115" rx="3" ry="5" fill="#38BDF8" opacity="0.7" />
        <ellipse cx="308" cy="106" rx="2.5" ry="4" fill="#bae6fd" opacity="0.8" />
        <ellipse cx="315" cy="118" rx="2" ry="3" fill="#38BDF8" opacity="0.6" />
        <ellipse cx="299" cy="122" rx="3" ry="4" fill="#7dd3fc" opacity="0.5" />
      </g>
    </svg>
  );
}

const STATS = [
  { value: '5', label: 'ขนาดมาตรฐาน', icon: '📏' },
  { value: '4', label: 'ประเภทงาน', icon: '🏷️' },
  { value: '3', label: 'หน่วยวัด', icon: '📐' },
  { value: '∞', label: 'ฟรี ตลอดไป', icon: '💚' },
];

export function HeroSection({ onCTAClick }: HeroSectionProps) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14 sm:pt-16 bg-transparent"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Animated blobs */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '-120px', left: '-100px', width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle, #10B981 0%, transparent 70%)', opacity: 0.13, filter: 'blur(70px)'
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, 25, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          bottom: '-100px', right: '-80px', width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)', opacity: 0.16, filter: 'blur(70px)'
        }}
        animate={{ scale: [1, 1.12, 1], y: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '25%', right: '8%', width: '320px', height: '320px', borderRadius: '50%',
          background: 'radial-gradient(circle, #6ee7b7 0%, transparent 70%)', opacity: 0.18, filter: 'blur(55px)'
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, -18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-5 sm:px-6 py-16 sm:py-20 flex flex-col items-center text-center max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div
            className="mb-7 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel shadow-emerald-500/10"
          >
            <span className="text-sm">🪠</span>
            <span className="text-xs font-bold tracking-wide text-emerald-400">
              Hose Size Helper · เครื่องมือแนะนำขนาดสายยาง
            </span>
          </div>
        </motion.div>

        {/* Illustration */}
        <motion.div
          variants={itemVariants}
          className="mb-8 w-full max-w-[360px]"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="rounded-3xl p-5 sm:p-7 inline-block w-full glass-panel">
            <FaucetHoseIllustration />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-[clamp(2.8rem,8vw,5rem)] font-extrabold leading-tight tracking-tight mb-4"
          style={{
            background: 'linear-gradient(135deg, #34d399 0%, #10B981 45%, #38BDF8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          สายยางกี่หุนดี
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-[clamp(1rem,2.8vw,1.2rem)] font-medium text-slate-200 mb-2 leading-relaxed"
        >
          วัดขนาดก๊อกน้ำ แล้วระบบจะแนะนำขนาดสายยางที่ควรซื้อ
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-sm text-slate-400 mb-10 leading-relaxed"
        >
          รองรับ 5 ขนาดมาตรฐาน · วิเคราะห์ความพอดี · สร้าง Keywords สำหรับช้อปปิ้ง
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass-button text-white text-lg font-bold shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.8) 0%, rgba(14,165,233,0.8) 100%)',
            }}
          >
            <span>🔍</span>
            <span>เริ่มวัดขนาด</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={18} />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-14 w-full"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center py-5 px-3 glass-panel rounded-2xl"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-2xl mb-2">{stat.icon}</span>
                <span className="text-xl font-extrabold text-emerald-400 leading-tight">{stat.value}</span>
                <span className="text-xs text-slate-400 font-medium text-center mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
