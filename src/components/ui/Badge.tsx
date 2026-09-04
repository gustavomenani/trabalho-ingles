import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'outline';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className,
}) => {
  const base = 'inline-flex items-center font-medium rounded-sm select-none';

  const sizes = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
  };

  const variants = {
    default: 'bg-paper text-ink dark:bg-paper-dark dark:text-ink-dark',
    primary: 'bg-stamp/10 text-stamp-ink dark:text-stamp',
    success: 'bg-mark/10 text-mark dark:text-mark-dark',
    warning: 'bg-stamp/10 text-stamp',
    outline: 'border border-rule text-ink dark:border-rule-dark dark:text-ink-dark',
  };

  return (
    <span className={twMerge(clsx(base, sizes[size], variants[variant], className))}>
      {children}
    </span>
  );
};
