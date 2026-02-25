'use client';

import { User } from '@/types/api/user';
import Image from 'next/image';
import AvatarPlaceholder from './AvatarPlaceholder';
import { useUser } from '@/contexts/UserProvider';
import { cn } from '@/lib/utils';

export const Avatar = ({
  size = 'small',
  className,
}: {
  size?: 'small' | 'large';
  className?: string;
}) => {
  const { user } = useUser();
  const imagePath = user?.image_path ? `${process.env.NEXT_PUBLIC_API_URL}${user?.image_path}` : '';
  return imagePath ? (
    <div
      className={cn(
        size == 'small' && 'h-10 w-10',
        size == 'large' && 'h-30 w-30',
        'relative overflow-hidden rounded-full',
        className,
      )}
    >
      <Image src={imagePath} alt="avatar" fill className="object-cover" unoptimized />
    </div>
  ) : (
    <AvatarPlaceholder size={size} />
  );
};
