import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, AlertCircle, Ruler, CheckCircle2 } from 'lucide-react';
import { Unit, UsageType, USAGE_OPTIONS } from '../hoseData';

interface CalculatorSectionProps {
  unit: Unit;
  setUnit: (u: Unit) => void;
  diameter: string;
  setDiameter: (v: string) => void;
  usage: UsageType | null;
  setUsage: (u: UsageType) => void;
  onCalculate: () => void;
  error?: string;
}

const UNITS: { value: Unit; label: string; hint: string; placeholder: string }[] = [
  { value: 'cm', label: 'เซนติเมตร (cm)', hint: 'เช่น 1.58 cm', placeholder: '1.58' },
  { value: 'mm', label: 'มิลลิเมตร (mm)', hint: 'เช่น 15.8 mm', placeholder: '15.8' },
  { value: 'inch', label: 'นิ้ว (inch)', hint: 'เช่น 0.625 inch', placeholder: '0.625' },
];

function StepLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <div
        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 2px 8px rgba(16,185,129,0.3)' }}
      >
        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white' }}>{n}</span>
      </div>
      <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#1F2937' }}>{label}</span>
    </div>
  );
}

export function CalculatorSection({
  unit, setUnit, diameter, setDiameter, usage, setUsage, onCalculate, error,
}: CalculatorSectionProps) {
  const currentUnit = UNITS.find((u) => u.value === unit)!;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-transparent text-slate-100">
      <div className="container mx-auto max-w-lg">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 glass-panel text-xs font-bold tracking-wide text-emerald-400">
            <Ruler size={14} />
            เครื่องมือคำนวณ
          </div>
          <h2 className="text-[clamp(1.6rem,4vw,2.25rem)] font-extrabold text-white mb-2 tracking-tight leading-tight">
            วัดขนาดก๊อกน้ำ
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            ใส่เส้นผ่านศูนย์กลางด้านนอกของก๊อก<br className="sm:hidden" /> แล้วเราจะแนะนำสายยางที่เหมาะสม
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="rounded-3xl overflow-hidden glass-card"
        >
          {/* Card top accent */}
          <div style={{ height: '3px', background: 'linear-gradient(90deg, #10B981, #38BDF8)' }} />

          <div className="p-6 sm:p-8 space-y-7">

            {/* Step 1: Unit */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30">
                  <span className="text-[10px] font-extrabold text-white">1</span>
                </div>
                <span className="text-sm font-bold text-slate-200">เลือกหน่วยวัด</span>
              </div>
              <div className="flex gap-2">
                {UNITS.map((u) => {
                  const active = unit === u.value;
                  return (
                    <motion.button
                      key={u.value}
                      onClick={() => setUnit(u.value)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${active
                          ? 'bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/20'
                          : 'glass-button text-slate-300 hover:text-white'
                        }`}
                    >
                      {u.value === 'inch' ? 'inch' : u.value}
                    </motion.button>
                  );
                })}
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={unit}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2.5 ml-1 text-xs font-medium text-emerald-400"
                >
                  💡 {currentUnit.hint}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-slate-800/50" />

            {/* Step 2: Input */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30">
                  <span className="text-[10px] font-extrabold text-white">2</span>
                </div>
                <span className="text-sm font-bold text-slate-200">เส้นผ่านศูนย์กลางด้านนอกของก๊อก</span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value)}
                  placeholder={currentUnit.placeholder}
                  min="0"
                  step="0.01"
                  onKeyDown={(e) => e.key === 'Enter' && onCalculate()}
                  className={`w-full outline-none transition-all duration-300 pr-24 pl-5 h-16 text-2xl font-bold rounded-2xl ${error ? 'border-red-500 bg-red-500/10 text-red-100' : 'glass-input text-white'
                    }`}
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 text-white text-sm font-bold shadow-md opacity-90 pointer-events-none">
                  {unit}
                </span>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl glass-panel border-red-500/30 bg-red-500/10 text-red-400 text-sm font-semibold"
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-slate-800/50" />

            {/* Step 3: Usage */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/30">
                  <span className="text-[10px] font-extrabold text-white">3</span>
                </div>
                <span className="text-sm font-bold text-slate-200">ประเภทการใช้งาน (ไม่บังคับ)</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {USAGE_OPTIONS.map((option) => {
                  const active = usage === option.id;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => setUsage(active ? option.id : option.id)}
                      whileTap={{ scale: 0.95 }}
                      whileHover={{ y: -2 }}
                      className={`relative flex flex-col items-start p-4 rounded-2xl text-left min-h-[80px] transition-all ${active
                          ? 'bg-emerald-500/20 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'glass-panel hover:bg-white/5'
                        }`}
                    >
                      <AnimatePresence>
                        {active && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="absolute top-3 right-3"
                          >
                            <CheckCircle2 size={18} className="text-emerald-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <span className="text-2xl mb-1.5">{option.icon}</span>
                      <span className={`text-sm font-bold leading-snug ${active ? 'text-emerald-300' : 'text-slate-300'} ${active ? 'pr-6' : ''}`}>
                        {option.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={onCalculate}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-16 rounded-2xl flex items-center justify-center gap-3 text-lg font-bold text-white glass-button"
              style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.85) 0%, rgba(14,165,233,0.85) 100%)',
                boxShadow: '0 8px 30px rgba(16,185,129,0.3)',
              }}
            >
              <Sparkles size={20} />
              วิเคราะห์ขนาดสายยาง
            </motion.button>

            {/* Tip */}
            <p className="text-center text-xs text-slate-400 leading-relaxed -mt-2">
              💡 วัดเส้นผ่านศูนย์กลางภายนอกของหัวก๊อกน้ำ ณ จุดที่จะต่อสายยาง · กด Enter เพื่อคำนวณ
            </p>
          </div>
        </motion.div>

        {/* Quick reference chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap justify-center gap-2 items-center"
        >
          <span className="text-xs font-semibold text-slate-400 mr-1">ขนาดมาตรฐาน:</span>
          {[
            { hun: 3, mm: 9.5 },
            { hun: 4, mm: 12.7 },
            { hun: 5, mm: 15.8 },
            { hun: 6, mm: 19.0 },
            { hun: 8, mm: 25.4 },
          ].map((s) => (
            <motion.button
              key={s.hun}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setUnit('mm'); setDiameter(String(s.mm)); }}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold glass-panel text-slate-300 hover:text-white"
            >
              <span className="text-emerald-400">{s.hun} หุน</span> <span className="text-slate-500 mx-1">·</span> {s.mm} mm
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
