'use client';

import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

type ButtonVariant = 'filled' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'className'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    'bg-[#C9A96E] text-[#0A0A0A] font-medium hover:bg-[#D4BC8A] active:bg-[#A68B5B]',
  outline:
    'border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E]/10 active:border-[#A68B5B] active:text-[#A68B5B]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-8 py-3 text-sm',
  lg: 'px-10 py-4 text-base',
};

export function Button({
  variant = 'filled',
  size = 'md',
  href,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const baseStyles =
    'inline-block uppercase tracking-[0.15em] font-sans transition-all duration-300 cursor-pointer text-center';

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
