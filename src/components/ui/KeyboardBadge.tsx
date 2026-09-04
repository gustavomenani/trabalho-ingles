import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface KeyboardBadgeProps {
  keys: string | string[];
  className?: string;
  size?: 'sm' | 'md';
}

export const KeyboardBadge: React.FC<KeyboardBadgeProps> = ({ keys, className, size = 'sm' }) => {
  const keyList = Array.isArray(keys) ? keys : [keys];

  return (
    <span className={twMerge(clsx('inline-flex items-center gap-1 select-none', className))}>
      {keyList.map((k, i) => (
        <kbd
          key={i}
          className={clsx(
            'inline-flex items-center justify-center font-medium rounded-sm border shadow-[0_1px_1px_rgba(51,51,51,0.12)]',
            size === 'sm' ? 'px-1.5 py-0.5 text-xs min-w-[22px] h-[22px]' : 'px-2 py-1 text-sm min-w-[28px] h-[28px]',
            'bg-paper text-ink border-rule dark:bg-paper-dark dark:text-ink-dark dark:border-rule-dark'
          )}
        >
          {k}
        </kbd>
      ))}
    </span>
  );
};
