'use client';

import { useUser } from '@/contexts/UserProvider';
import { cn } from '@/lib/utils';

export default function AvatarPlaceholder({
  size,
  className,
}: {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  className?: string;
}) {
  const { user } = useUser();
  return (
    <div
      className={cn(
        size == 'xsmall' && 'h-8 w-8',
        size == 'small' && 'h-10 w-10',
        size == 'medium' && 'h-12 w-12',
        size == 'large' && 'h-18 w-18',
        size == 'xlarge' && 'h-24 w-24',
        size == 'xxlarge' && 'h-30 w-30',
        'flex items-center justify-center rounded-full bg-amber-200',
        className,
      )}
    >
      {user?.name[0].toUpperCase()}
    </div>
  );
}
