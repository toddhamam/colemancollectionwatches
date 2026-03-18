'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <motion.div
      className={alignClass}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-[#C9A96E] font-sans font-medium mb-4">
        {subtitle}
      </p>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#FAFAF7] leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`text-lg text-cc-cream/80 font-sans font-light mt-6 max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
