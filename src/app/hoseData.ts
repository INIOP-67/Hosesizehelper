export type Unit = 'cm' | 'mm' | 'inch';
export type UsageType = 'garden' | 'carwash' | 'household' | 'heavy';
export type FitStatus = 'perfect' | 'slightly_loose' | 'loose';

export interface HoseSize {
  hun: number;
  inch: string;
  mm: number;
  cm: number;
  clampSize: string;
}

export const HOSE_SIZES: HoseSize[] = [
  { hun: 3, inch: '3/8', mm: 9.5,  cm: 0.95, clampSize: '10–16 mm' },
  { hun: 4, inch: '1/2', mm: 12.7, cm: 1.27, clampSize: '12–20 mm' },
  { hun: 5, inch: '5/8', mm: 15.8, cm: 1.58, clampSize: '16–25 mm' },
  { hun: 6, inch: '3/4', mm: 19.0, cm: 1.90, clampSize: '18–30 mm' },
  { hun: 8, inch: '1',   mm: 25.4, cm: 2.54, clampSize: '25–40 mm' },
];

export function toMm(value: number, unit: Unit): number {
  if (unit === 'cm')   return value * 10;
  if (unit === 'inch') return value * 25.4;
  return value;
}

export function findBestHose(diameterMm: number): { hose: HoseSize; diff: number } {
  let best = HOSE_SIZES[0];
  let minAbsDiff = Math.abs(HOSE_SIZES[0].mm - diameterMm);
  for (const hose of HOSE_SIZES) {
    const absDiff = Math.abs(hose.mm - diameterMm);
    if (absDiff < minAbsDiff) {
      minAbsDiff = absDiff;
      best = hose;
    }
  }
  return { hose: best, diff: best.mm - diameterMm };
}

export function getFitStatus(diff: number): FitStatus {
  const absDiff = Math.abs(diff);
  if (absDiff <= 1) return 'perfect';
  if (absDiff <= 3) return 'slightly_loose';
  return 'loose';
}

export interface FitConfig {
  label: string;
  labelTh: string;
  emoji: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  dotColor: string;
  description: string;
}

export const FIT_CONFIG: Record<FitStatus, FitConfig> = {
  perfect: {
    label: 'Perfect Fit',
    labelTh: 'พอดีสนิท',
    emoji: '✅',
    colorClass: 'text-emerald-700',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    dotColor: '#10B981',
    description: 'ขนาดสายยางเหมาะสมพอดีกับก๊อกน้ำของคุณ ไม่จำเป็นต้องใช้เข็มขัดรัดสาย',
  },
  slightly_loose: {
    label: 'Slightly Loose',
    labelTh: 'หลวมเล็กน้อย',
    emoji: '⚠️',
    colorClass: 'text-amber-700',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    dotColor: '#F59E0B',
    description: 'สายยางหลวมเล็กน้อย แนะนำให้ใช้เข็มขัดรัดสายยางเพื่อป้องกันน้ำรั่ว',
  },
  loose: {
    label: 'Loose',
    labelTh: 'หลวมมาก',
    emoji: '🔴',
    colorClass: 'text-red-700',
    bgClass: 'bg-red-50',
    borderClass: 'border-red-200',
    dotColor: '#EF4444',
    description: 'สายยางหลวมมาก ควรใช้เข็มขัดรัดสายยาง หรือพิจารณาเลือกขนาดที่เหมาะสมกว่า',
  },
};

export interface UsageOption {
  id: UsageType;
  label: string;
  icon: string;
  hoseType: string;
  hoseDescription: string;
  searchKeyword: string;
}

export const USAGE_OPTIONS: UsageOption[] = [
  {
    id: 'garden',
    label: 'รดน้ำต้นไม้',
    icon: '🌱',
    hoseType: 'สายยาง PVC น้ำหนักเบา',
    hoseDescription: 'เหมาะสำหรับรดน้ำต้นไม้ ยืดหยุ่นดี น้ำหนักเบา พกพาสะดวก ราคาประหยัด ทนแสงแดด',
    searchKeyword: 'สายยางรดน้ำ',
  },
  {
    id: 'carwash',
    label: 'ล้างรถ',
    icon: '🚗',
    hoseType: 'สายยางทนทาน ขนาด 5/8 นิ้ว',
    hoseDescription: 'ทนแรงดันน้ำสูง ผิวแข็งแรง เหมาะสำหรับล้างรถและทำความสะอาดทั่วไป',
    searchKeyword: 'สายยางล้างรถ',
  },
  {
    id: 'household',
    label: 'งานบ้านทั่วไป',
    icon: '🏠',
    hoseType: 'สายยางอเนกประสงค์',
    hoseDescription: 'ใช้งานได้หลากหลาย ทนทาน เหมาะกับงานบ้านทั่วไป คุ้มค่าคุ้มราคา',
    searchKeyword: 'สายยางอเนกประสงค์',
  },
  {
    id: 'heavy',
    label: 'งานช่าง / แรงดันสูง',
    icon: '🔧',
    hoseType: 'สายยางเสริมแรง (Reinforced)',
    hoseDescription: 'รับแรงดันสูงได้ดีเยี่ยม เสริมด้วยผ้าหรือลวด เหมาะกับงานหนักและอุปกรณ์แรงดันสูง',
    searchKeyword: 'สายยางเสริมแรง',
  },
];

export interface HistoryEntry {
  id: string;
  date: string;
  measuredSize: string;
  unit: Unit;
  recommendedHose: string;
  fitResult: FitStatus;
}

export interface CalcResult {
  inputDiameter: number;
  unit: Unit;
  diameterMm: number;
  hose: HoseSize;
  diff: number;
  fitStatus: FitStatus;
  usage: UsageType | null;
}
