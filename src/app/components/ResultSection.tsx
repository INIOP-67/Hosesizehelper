import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, ExternalLink, Wrench, Droplets, Tag, BarChart2 } from 'lucide-react';
import { CalcResult, FIT_CONFIG, USAGE_OPTIONS } from '../hoseData';

interface ResultSectionProps {
  result: CalcResult;
}

// ─── Clipboard helper ────────────────────────────────────────────────────────
function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}
function fallbackCopy(text: string) {
  const ta = document.createElement('textarea');
  ta.value = text;
  Object.assign(ta.style, { position: 'fixed', top: '-9999px', left: '-9999px' });
  document.body.appendChild(ta);
  ta.focus(); ta.select();
  try { document.execCommand('copy'); } catch { }
  document.body.removeChild(ta);
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
function Card({ children, delay = 0, style = {}, className = '' }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={`rounded-3xl glass-card ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Card header row ──────────────────────────────────────────────────────────
function CardHeader({ icon, title, iconBg, titleColor = '#f8fafc' }: {
  icon: React.ReactNode; title: string; iconBg: string; titleColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconBg, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
      >
        {icon}
      </div>
      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: titleColor }}>{title}</span>
    </div>
  );
}

// ─── Fit gauge ────────────────────────────────────────────────────────────────
function FitGauge({ fitStatus }: { fitStatus: 'perfect' | 'slightly_loose' | 'loose' }) {
  const values = { perfect: 100, slightly_loose: 55, loose: 20 };
  const colors = { perfect: '#34d399', slightly_loose: '#fbbf24', loose: '#f87171' };
  const pct = values[fitStatus];
  const color = colors[fitStatus];
  return (
    <div className="mt-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-xs font-semibold text-slate-400">ความพอดี</span>
        <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="rounded-full overflow-hidden h-2 bg-slate-800/80 ring-1 ring-inset ring-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 10px ${color}88` }}
        />
      </div>
    </div>
  );
}

// ─── Size Card ────────────────────────────────────────────────────────────────
function SizeCard({ result }: { result: CalcResult }) {
  const { hose, unit } = result;
  const sizes = [
    { label: `${hose.inch}"`, sub: 'Inch', active: unit === 'inch' },
    { label: `${hose.mm} mm`, sub: 'mm', active: unit === 'mm' },
    { label: `${hose.cm} cm`, sub: 'cm', active: unit === 'cm' },
  ];

  return (
    <Card delay={0}>
      <div className="p-5 sm:p-6 pb-2" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(14,165,233,0.05) 100%)' }}>
        <CardHeader
          icon={<Droplets size={17} color="white" />}
          iconBg="linear-gradient(135deg, #10B981, #0ea5e9)"
          title="ขนาดสายยางที่เหมาะสม"
          titleColor="#34d399"
        />

        {/* Hero number */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
          className="flex items-center justify-center py-6 rounded-2xl mb-5 glass-panel"
        >
          <div className="text-center">
            <div
              className="text-[clamp(3rem,10vw,4rem)] font-black leading-none tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #34d399, #38bdf8)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              {hose.hun} หุน
            </div>
            <div className="text-sm font-medium text-slate-300 mt-2">
              {hose.inch}" = {hose.mm} mm = {hose.cm} cm
            </div>
          </div>
        </motion.div>

        {/* Size chips */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {sizes.map((s) => (
            <div
              key={s.sub}
              className={`text-center py-3 px-2 rounded-xl transition-all ${s.active
                  ? 'bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/25 border border-transparent'
                  : 'glass-panel text-slate-300 border-slate-700/50'
                }`}
            >
              <div className="text-[0.95rem] font-bold">{s.label}</div>
              <div className="text-[0.62rem] opacity-75 mt-0.5 font-semibold">{s.sub}</div>
              {s.active && <div className="text-[0.58rem] mt-0.5 opacity-90 font-bold">หน่วยที่เลือก ★</div>}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

// ─── Fit Card ─────────────────────────────────────────────────────────────────
function FitCard({ result }: { result: CalcResult }) {
  const config = FIT_CONFIG[result.fitStatus];
  const borderColors = { perfect: 'rgba(52,211,153,0.3)', slightly_loose: 'rgba(251,191,36,0.3)', loose: 'rgba(248,113,113,0.3)' };
  const bgGradients = {
    perfect: 'linear-gradient(135deg, rgba(16,185,129,0.1), transparent)',
    slightly_loose: 'linear-gradient(135deg, rgba(245,158,11,0.1), transparent)',
    loose: 'linear-gradient(135deg, rgba(239,68,68,0.1), transparent)'
  };

  return (
    <Card delay={0.08} style={{ border: `1px solid ${borderColors[result.fitStatus]}`, background: bgGradients[result.fitStatus] }}>
      <div className="p-5 sm:p-6 backdrop-blur-md">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardHeader
              icon={<BarChart2 size={17} color="white" />}
              iconBg={result.fitStatus === 'perfect' ? '#10B981' : result.fitStatus === 'slightly_loose' ? '#F59E0B' : '#EF4444'}
              title="การวิเคราะห์ความพอดี"
            />

            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full mb-3 glass-panel`}
              style={{ border: `1px solid ${borderColors[result.fitStatus]}` }}
            >
              <motion.div
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-2.5 h-2.5 rounded-full shadow-md"
                style={{ background: config.dotColor, flexShrink: 0, boxShadow: `0 0 8px ${config.dotColor}` }}
              />
              <span className={`text-[0.82rem] font-bold ${result.fitStatus === 'perfect' ? 'text-emerald-400' : result.fitStatus === 'slightly_loose' ? 'text-amber-400' : 'text-red-400'}`}>
                {config.label}
              </span>
              <span className="text-[0.82rem] font-semibold text-slate-400">· {config.labelTh}</span>
            </div>

            <p className="text-[0.88rem] text-slate-300 leading-relaxed">{config.description}</p>

            {result.diff !== 0 && (
              <p className="mt-2 text-[0.78rem] font-medium text-slate-400">
                Δ ความต่าง: <span className="font-bold text-slate-200">{result.diff > 0 ? '+' : ''}{result.diff.toFixed(1)} mm</span>
                {result.diff > 0 ? ' (สายยางใหญ่กว่า)' : ' (ก๊อกใหญ่กว่า)'}
              </p>
            )}

            <FitGauge fitStatus={result.fitStatus} />
          </div>

          <motion.span
            initial={{ rotate: -15, scale: 0.5 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
            className="text-[2.8rem] flex-shrink-0 opacity-90 drop-shadow-lg"
          >
            {config.emoji}
          </motion.span>
        </div>
      </div>
    </Card>
  );
}

// ─── Clamp Card ───────────────────────────────────────────────────────────────
function ClampCard({ result }: { result: CalcResult }) {
  if (result.fitStatus === 'perfect') return null;
  return (
    <Card delay={0.16} className="border-amber-500/30 bg-amber-500/5">
      <div className="p-5 sm:p-6 backdrop-blur-md">
        <CardHeader
          icon={<Wrench size={17} color="white" />}
          iconBg="#F59E0B"
          title="คำแนะนำเข็มขัดรัดสาย"
          titleColor="#fbbf24"
        />
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center glass-panel border-amber-500/30">
            <svg viewBox="0 0 60 60" width="36" height="36">
              <circle cx="30" cy="30" r="22" fill="none" stroke="#F59E0B" strokeWidth="4" />
              <circle cx="30" cy="30" r="13" fill="none" stroke="#fcd34d" strokeWidth="3" />
              <rect x="44" y="26" width="14" height="8" rx="3" fill="#D97706" />
              <rect x="45" y="27" width="12" height="6" rx="2" fill="#F59E0B" />
              <rect x="47" y="28" width="8" height="2" rx="1" fill="#fcd34d" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[0.82rem] font-semibold text-amber-200/80 mb-1.5">แนะนำขนาดเข็มขัดรัดสาย</p>
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white text-base font-extrabold shadow-[0_4px_15px_rgba(245,158,11,0.3)] border border-amber-400/50">
              {result.hose.clampSize}
            </div>
            <p className="text-[0.75rem] font-medium text-amber-500 mt-1.5">
              สำหรับสายยาง {result.hose.hun} หุน ({result.hose.inch}")
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

// ─── Hose Type Card ───────────────────────────────────────────────────────────
function HoseTypeCard({ result }: { result: CalcResult }) {
  if (!result.usage) return null;
  const opt = USAGE_OPTIONS.find((u) => u.id === result.usage);
  if (!opt) return null;
  return (
    <Card delay={0.22}>
      <div className="p-5 sm:p-6 bg-gradient-to-br from-indigo-500/5 to-sky-500/5 border-t border-sky-500/20">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-xl glass-panel border-sky-500/30">
            {opt.icon}
          </div>
          <span className="text-[0.95rem] font-bold text-sky-300">แนะนำประเภทสายยาง</span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-3 bg-gradient-to-br from-indigo-500 to-sky-500 text-white text-[0.88rem] font-bold shadow-[0_4px_15px_rgba(14,165,233,0.3)] border border-sky-400/50">
          {opt.hoseType}
        </div>
        <p className="text-[0.88rem] text-slate-300 leading-relaxed">{opt.hoseDescription}</p>
      </div>
    </Card>
  );
}

// ─── Keyword Generator ────────────────────────────────────────────────────────
function KeywordGenerator({ result }: { result: CalcResult }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const opt = result.usage ? USAGE_OPTIONS.find((u) => u.id === result.usage) : null;
  const { hose } = result;

  const keywords = [
    `สายยาง ${hose.hun} หุน`,
    `สายยาง ${hose.inch} นิ้ว`,
    `garden hose ${hose.inch} inch`,
    opt ? `${opt.searchKeyword} ${hose.inch}" ${hose.hun}หุน` : `สายยาง ${hose.inch}" PVC`,
    `สายยาง ${hose.mm}mm`,
    `hose ${hose.inch} สายยางสวน`,
  ];

  const shopeeUrl = `https://shopee.co.th/search?keyword=สายยาง%20${hose.hun}%20หุน`;

  const doCopy = (text: string, index: number) => {
    copyToClipboard(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };
  const doCopyAll = () => {
    copyToClipboard(keywords.join('\n')).then(() => {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  return (
    <Card delay={0.3}>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <CardHeader
            icon={<Tag size={17} color="white" />}
            iconBg="linear-gradient(135deg, #8B5CF6, #EC4899)"
            title="Keywords สำหรับช้อปปิ้ง"
            titleColor="#f472b6"
          />
          <span className="text-[0.72rem] text-slate-400 font-medium shrink-0 self-start pt-0.5">
            คลิกเพื่อ copy
          </span>
        </div>

        <div className="space-y-2 mb-5">
          {keywords.map((kw, i) => (
            <motion.button
              key={i}
              onClick={() => doCopy(kw, i)}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left transition-all ${copiedIndex === i
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                  : 'glass-input text-slate-200 hover:bg-slate-800/50'
                }`}
            >
              <span className="text-[0.875rem] font-medium flex-1">{kw}</span>
              <AnimatePresence mode="wait">
                {copiedIndex === i ? (
                  <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check size={15} color="#34d399" />
                  </motion.div>
                ) : (
                  <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Copy size={15} color="#94a3b8" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            onClick={doCopyAll}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[0.85rem] font-bold transition-all ${copiedAll
                ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                : 'glass-button text-slate-300 hover:text-white'
              }`}
          >
            {copiedAll ? <Check size={15} /> : <Copy size={15} />}
            {copiedAll ? 'คัดลอกแล้ว ✓' : 'Copy ทั้งหมด'}
          </motion.button>

          <motion.a
            href={shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 py-3.5 rounded-2xl no-underline text-[0.85rem] font-bold text-white shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #EE4D2D, #FF6633)',
              boxShadow: '0 4px 16px rgba(238,77,45,0.3)',
              border: '1px solid rgba(255,102,51,0.5)'
            }}
          >
            <ExternalLink size={15} />
            ค้นหาบน Shopee
          </motion.a>
        </div>
      </div>
    </Card>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function ResultSection({ result }: ResultSectionProps) {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-transparent">
      <div className="container mx-auto max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-4 glass-panel text-[0.78rem] font-bold text-emerald-400 border border-emerald-400/20 tracking-wide">
            ✨ ผลการวิเคราะห์
          </div>
          <h2 className="text-[clamp(1.5rem,4vw,2rem)] font-extrabold text-white tracking-tight mb-1 leading-tight">
            ขนาดสายยางที่เหมาะสม
          </h2>
          <p className="text-slate-400 text-[0.88rem]">
            จากขนาดก๊อกน้ำ <strong className="text-emerald-300">{result.inputDiameter} {result.unit}</strong> ({result.diameterMm.toFixed(1)} mm)
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-4">
          <SizeCard result={result} />
          <FitCard result={result} />
          <ClampCard result={result} />
          <HoseTypeCard result={result} />
          <KeywordGenerator result={result} />
        </div>
      </div>
    </section>
  );
}
