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
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.99] cursor-pointer';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-sm px-4 py-2.5 gap-2',
      lg: 'text-base px-6 py-3 gap-2.5 shadow-xs',
    };

    const variantStyles = {
      primary:
        'bg-slate-900 text-white hover:bg-slate-800 active:bg-black focus-visible:ring-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:active:bg-slate-200 dark:focus-visible:ring-white shadow-xs',
      secondary:
        'bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100 border border-slate-300/80 focus-visible:ring-slate-400 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:border-zinc-700/80',
      ghost:
        'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 active:bg-slate-200/60 focus-visible:ring-slate-400 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/80',
      danger:
        'bg-rose-600 text-white hover:bg-rose-500 active:bg-rose-700 focus-visible:ring-rose-500',
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
          <kbd className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-black/10 dark:bg-white/10 text-current border border-black/10 dark:border-white/10">
            {shortcutBadge}
          </kbd>
        )}
        {iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
