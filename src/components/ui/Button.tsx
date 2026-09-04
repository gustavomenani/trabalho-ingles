import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  shortcutBadge?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      iconLeft,
      iconRight,
      shortcutBadge,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stamp focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-paper-dark disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer min-h-11';

    const sizeStyles = {
      sm: 'text-sm px-3 py-2 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3 gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-stamp text-white hover:bg-stamp-ink active:bg-stamp-ink shadow-[0_1px_2px_rgba(51,51,51,0.18)]',
      secondary:
        'bg-sheet text-ink hover:bg-paper active:bg-paper border border-rule dark:bg-sheet-dark dark:text-ink-dark dark:hover:bg-paper-dark dark:border-rule-dark',
      ghost:
        'text-muted hover:text-ink hover:bg-paper dark:text-muted-dark dark:hover:text-ink-dark dark:hover:bg-sheet-dark',
      danger:
        'bg-stamp text-white hover:bg-stamp-ink',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
        {...props}
      >
        {iconLeft && <span className="shrink-0">{iconLeft}</span>}
        <span>{children}</span>
        {shortcutBadge && (
          <kbd className="ml-1.5 px-1.5 py-0.5 text-xs font-medium rounded-sm bg-black/10 dark:bg-white/10 text-current border border-black/10 dark:border-white/10">
            {shortcutBadge}
          </kbd>
        )}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
