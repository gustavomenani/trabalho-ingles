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
            'rounded-md transition-colors duration-150 border bg-sheet dark:bg-sheet-dark',
            interactive &&
              'cursor-pointer hover:border-ink dark:hover:border-ink-dark',
            selected
              ? 'border-stamp ring-1 ring-stamp/30'
              : 'border-rule dark:border-rule-dark',
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
