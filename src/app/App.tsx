import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CalculatorSection } from './components/CalculatorSection';
import { ResultSection } from './components/ResultSection';
import { HistorySection } from './components/HistorySection';
import { Footer } from './components/Footer';
import {
  toMm, findBestHose, getFitStatus,
  Unit, UsageType, HistoryEntry, CalcResult,
} from './hoseData';

function loadHistory(): HistoryEntry[] {
  try {
    const stored = localStorage.getItem('hose-size-history');
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
}
function saveHistory(h: HistoryEntry[]) {
  try { localStorage.setItem('hose-size-history', JSON.stringify(h)); } catch { }
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 600));

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed z-50 bottom-6 right-5 sm:bottom-8 sm:right-8 w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #10B981, #0ea5e9)',
            boxShadow: '0 8px 24px rgba(16,185,129,0.4)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          <ArrowUp size={18} color="white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [unit, setUnit] = useState<Unit>('cm');
  const [diameter, setDiameter] = useState('');
  const [usage, setUsage] = useState<UsageType | null>(null);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);

  const calculatorRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCalculate = useCallback(() => {
    const numDiameter = parseFloat(diameter);
    if (!diameter.trim()) { setError('กรุณาใส่ขนาดเส้นผ่านศูนย์กลาง'); return; }
    if (isNaN(numDiameter) || numDiameter <= 0) { setError('กรุณาใส่ตัวเลขที่มากกว่า 0'); return; }
    if (numDiameter > 1000) { setError('ขนาดใหญ่เกินไป กรุณาตรวจสอบหน่วยวัด'); return; }
    setError('');

    const diameterMm = toMm(numDiameter, unit);
    const { hose, diff } = findBestHose(diameterMm);
    const fitStatus = getFitStatus(diff);

    const newResult: CalcResult = { inputDiameter: numDiameter, unit, diameterMm, hose, diff, fitStatus, usage };
    setResult(newResult);

    const entry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: '2-digit' }),
      measuredSize: diameter,
      unit,
      recommendedHose: `${hose.hun} หุน (${hose.inch}")`,
      fitResult: fitStatus,
    };
    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, 20);
      saveHistory(updated);
      return updated;
    });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  }, [diameter, unit, usage]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('hose-size-history');
  };

  return (
    <div className="min-h-screen text-slate-100 bg-animated-gradient font-sans">
      {/* Sticky Navbar */}
      <Navbar onCTAClick={scrollToCalculator} />

      {/* Hero */}
      <HeroSection onCTAClick={scrollToCalculator} />

      {/* Subtle section transition removed in favor of glass depth */}

      {/* Calculator */}
      <div ref={calculatorRef}>
        <CalculatorSection
          unit={unit}
          setUnit={(u) => { setUnit(u); setDiameter(''); setError(''); }}
          diameter={diameter}
          setDiameter={setDiameter}
          usage={usage}
          setUsage={setUsage}
          onCalculate={handleCalculate}
          error={error}
        />
      </div>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
          >
            <ResultSection result={result} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      {history.length > 0 && (
        <HistorySection history={history} onClear={clearHistory} />
      )}

      {/* Footer */}
      <Footer />

      {/* Floating scroll-to-top */}
      <ScrollToTop />
    </div>
  );
}
