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
    <span className={twMerge(clsx('inline-flex items-center gap-1 select-none font-mono', className))}>
      {keyList.map((k, i) => (
        <kbd
          key={i}
          className={clsx(
            'inline-flex items-center justify-center font-medium rounded border transition-colors shadow-[0_1px_1px_rgba(0,0,0,0.08)]',
            size === 'sm' ? 'px-1.5 py-0.5 text-[10px] min-w-[20px] h-[20px]' : 'px-2 py-1 text-xs min-w-[24px] h-[24px]',
            'bg-slate-100 text-slate-700 border-slate-300/80 dark:bg-slate-800/90 dark:text-slate-300 dark:border-slate-700'
          )}
        >
          {k}
        </kbd>
      ))}
    </span>
  );
};
