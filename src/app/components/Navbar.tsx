import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

interface NavbarProps {
  onCTAClick: () => void;
}

export function Navbar({ onCTAClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-navbar py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #10B981, #0ea5e9)',
                boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
              }}
            >
              <span className="text-xl leading-none">🪠</span>
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                สายยางกี่หุนดี
              </span>
              <span
                className="hidden sm:inline ml-2 px-1.5 py-0.5 rounded text-white text-[0.6rem] font-bold align-middle"
                style={{
                  background: 'linear-gradient(135deg, #10B981, #0ea5e9)',
                  boxShadow: '0 2px 8px rgba(16,185,129,0.4)',
                }}
              >
                BETA
              </span>
            </div>
          </div>

          {/* Right: CTA */}
          <motion.button
            onClick={onCTAClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-button text-sm font-bold text-white shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.8), rgba(14,165,233,0.8))',
              boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <span>🔍</span>
            <span className="hidden xs:inline">เริ่มวัดขนาด</span>
            <span className="xs:hidden">วัดขนาด</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
