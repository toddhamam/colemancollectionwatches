'use client';

import { motion } from 'framer-motion';

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className = '' }: GoldDividerProps) {
  return (
    <motion.div
      className={`h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent max-w-md mx-auto ${className}`.trim()}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    />
  );
}
