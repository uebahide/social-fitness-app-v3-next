'use client';

import { User } from '@/types/api/user';
import Image from 'next/image';
import AvatarPlaceholder from './AvatarPlaceholder';
import { useUser } from '@/contexts/UserProvider';
import { cn } from '@/lib/utils';

export const Avatar = ({
  size = 'small',
  className,
  user,
}: {
  size?: 'xsmall' | 'small' | 'medium' | 'large';
  className?: string;
  user?: User;
}) => {
  const { user: login_user } = useUser();
  const target_user = user ?? login_user;
  const imagePath = target_user?.image_path
    ? `${process.env.NEXT_PUBLIC_S3_URL}${target_user.image_path}`
    : '';
  return imagePath ? (
    <div
      className={cn(
        size == 'xsmall' && 'h-8 w-8',
        size == 'small' && 'h-10 w-10',
        size == 'medium' && 'h-12 w-12',
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
