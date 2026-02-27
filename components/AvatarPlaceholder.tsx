'use client';

import { useUser } from '@/contexts/UserProvider';
import { cn } from '@/lib/utils';

export default function AvatarPlaceholder({
  size,
  className,
}: {
  size?: 'small' | 'large';
  className?: string;
}) {
  const { user } = useUser();
  return (
    <div
      className={cn(
        size == 'small' && 'h-10 w-10',
        size == 'large' && 'h-30 w-30',
        'flex items-center justify-center rounded-full bg-amber-200',
        className,
      )}
    >
      {user?.name[0].toUpperCase()}
    </div>
  );
}
