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
            'rounded-xl transition-[border-color,background-color,box-shadow,transform] duration-100 ease-out border',
            interactive && 'cursor-pointer hover:border-slate-400 dark:hover:border-zinc-600 active:scale-[0.995] will-change-transform',
            selected
              ? 'bg-slate-50/90 border-slate-900 ring-1 ring-slate-900 dark:bg-zinc-800/80 dark:border-zinc-200 dark:ring-zinc-200'
              : 'bg-white dark:bg-zinc-900 border-slate-200/90 dark:border-zinc-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)]',
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
