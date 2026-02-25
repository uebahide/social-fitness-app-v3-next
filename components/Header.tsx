'use client';

import { useUser } from '@/contexts/UserProvider';
import { LogoutButton } from './LogoutButton';
import { useEffect } from 'react';
import Image from 'next/image';
import { Button } from './buttons/Button';
import Link from 'next/link';
import AvatarPlaceholder from './AvatarPlaceholder';

export default function Header() {
  const { user, setUser } = useUser();

  return (
    <div className="flex justify-end border-b border-gray-200 px-5 py-3">
      {user ? (
        <div className="flex items-center gap-5">
          <Link href="/profile" className="flex cursor-pointer items-center gap-5">
            <p>{user.name}</p>
            {/* todo - replace this icon component with Image component */}
            <AvatarPlaceholder className="h-10 w-10" />
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <div>
          <Button color="primary">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
