import { cn } from '@/lib/utils';
import { buttonColor } from '@/types/buttonType';
import React from 'react';

export const Button = ({
  color = 'primary',
  type = undefined,
  className,
  disabled = false,
  onClick,
  children,
}: {
  color: buttonColor;
  type?: 'submit' | 'reset' | 'button' | 'button' | undefined;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      type={type}
      className={cn(
        color == 'primary' &&
          'bg-brand-primary-300 hover:bg-brand-primary-400 disabled:bg-brand-primary-300',
        color == 'secondary' &&
          'bg-brand-secondary-300 hover:bg-brand-secondary-400 disabled:bg-brand-secondary-300',
        'flex min-h-8 w-30 cursor-pointer items-center justify-center rounded-lg px-2 py-1 shadow-sm disabled:cursor-not-allowed',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
