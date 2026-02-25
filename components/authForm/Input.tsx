import { cn } from '@/lib/utils';
import { HTMLInputTypeAttribute } from 'react';

export const Input = ({
  defaultValue,
  id,
  name,
  type = 'text',
  required,
  className,
}: {
  defaultValue: string;
  id: string;
  name: string;
  type: HTMLInputTypeAttribute | undefined;
  required: boolean;
  className?: string;
}) => {
  return (
    <input
      defaultValue={defaultValue}
      type={type}
      id={id}
      name={name}
      className={cn(
        'h-8 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none',
        className,
      )}
      required={required}
    />
  );
};
