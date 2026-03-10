import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { HistoryEntry, FIT_CONFIG } from '../hoseData';

interface HistorySectionProps {
  history: HistoryEntry[];
  onClear: () => void;
}

function HistoryCard({ entry, index }: { entry: HistoryEntry; index: number }) {
  const config = FIT_CONFIG[entry.fitResult];
  const borderColors = { perfect: 'border-emerald-500/30', slightly_loose: 'border-amber-500/30', loose: 'border-red-500/30' };
  const bgClasses = { perfect: 'bg-emerald-500/10', slightly_loose: 'bg-amber-500/10', loose: 'bg-red-500/10' };
  const textColors = { perfect: 'text-emerald-400', slightly_loose: 'text-amber-400', loose: 'text-red-400' };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16, height: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="flex items-center gap-3 sm:gap-4 px-4 py-3.5 rounded-2xl glass-panel text-slate-200"
    >
      {/* Number badge */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-slate-800/80 border border-slate-700">
        <span className="text-[0.7rem] font-extrabold text-slate-400">#{index + 1}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[0.92rem] font-bold text-white">
            {entry.measuredSize}
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[0.7rem] font-bold border border-slate-700/50">
            {entry.unit}
          </span>
          <span className="text-[0.78rem] text-slate-500 font-bold">→</span>
          <span className="text-[0.85rem] font-bold text-emerald-400">{entry.recommendedHose}</span>
        </div>
        <span className="text-[0.72rem] text-slate-400 font-medium">{entry.date}</span>
      </div>

      {/* Fit badge */}
      <div
        className={`flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border ${borderColors[entry.fitResult]} ${bgClasses[entry.fitResult]} ${textColors[entry.fitResult]}`}
      >
        <span className="text-[0.7rem] font-bold whitespace-nowrap">{config.labelTh}</span>
      </div>
    </motion.div>
  );
}

export function HistorySection({ history, onClear }: HistorySectionProps) {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE = 5;

  if (history.length === 0) return null;

  const displayed = showAll ? history : history.slice(0, VISIBLE);
  const hasMore = history.length > VISIBLE;

  return (
    <section className="py-14 sm:py-16 px-4 sm:px-6 bg-transparent text-slate-100">
      <div className="container mx-auto max-w-lg">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between mb-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-sky-500 shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
              <Clock size={16} color="white" />
            </div>
            <div>
              <h2 className="text-[1.1rem] font-bold text-white leading-tight">ประวัติการวัด</h2>
              <p className="text-[0.72rem] text-emerald-400 font-semibold mt-0.5">{history.length} รายการ</p>
            </div>
          </div>

          <motion.button
            onClick={onClear}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-button text-red-400 border-red-500/30 hover:bg-red-500/10 text-[0.78rem] font-bold"
          >
            <Trash2 size={13} />
            ล้างประวัติ
          </motion.button>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-2.5"
        >
          <AnimatePresence>
            {displayed.map((entry, i) => (
              <HistoryCard key={entry.id} entry={entry} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show more / less */}
        {hasMore && (
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={() => setShowAll(!showAll)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-3 flex items-center justify-center gap-2 py-3 rounded-2xl glass-button text-slate-300 font-bold text-[0.82rem]"
          >
            {showAll ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            {showAll ? 'แสดงน้อยลง' : `แสดงทั้งหมด ${history.length} รายการ`}
          </motion.button>
        )}

        {/* Note */}
        <p className="text-center mt-5 text-[0.73rem] font-medium text-slate-500">
          📱 ประวัติบันทึกในเครื่องของคุณ (localStorage)
        </p>
      </div>
    </section>
  );
}
