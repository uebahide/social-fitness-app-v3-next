'use client';

import { useUser } from '@/contexts/UserProvider';
import { cn } from '@/lib/utils';

export default function AvatarPlaceholder({ className }: { className?: string }) {
  const { user } = useUser();
  return (
    <div
      className={cn(
        'flex h-20 w-20 items-center justify-center rounded-full bg-amber-200',
        className,
      )}
    >
      {user?.name[0].toUpperCase()}
    </div>
  );
}
