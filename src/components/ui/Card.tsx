import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, selected = false, interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'rounded-xl transition-[border-color,background-color,box-shadow,transform] duration-150 ease-out border',
            interactive &&
              'cursor-pointer hover:border-slate-400 dark:hover:border-zinc-600 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-[0.995]',
            selected
              ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900/20 dark:bg-zinc-800 dark:border-white dark:ring-white/20 shadow-[0_4px_14px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]'
              : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)]',
            className
          )
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
