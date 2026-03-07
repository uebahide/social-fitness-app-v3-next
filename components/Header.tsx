'use client';

import { useUser } from '@/contexts/UserProvider';
import { LogoutButton } from './LogoutButton';
import { Button } from './buttons/Button';
import Link from 'next/link';
import { Avatar } from './Avatar';
import { LogInIcon } from 'lucide-react';

export default function Header() {
  const { user, setUser } = useUser();
  const imagePath = user?.image_path ? `${process.env.NEXT_PUBLIC_API_URL}${user?.image_path}` : '';

  return (
    <div className="flex justify-end border-b border-gray-200 px-5 py-3">
      {user ? (
        <div className="flex items-center gap-3">
          <LogoutButton />
          <Link href="/profile" className="flex cursor-pointer items-center">
            {/* <p>{user.name}</p> */}
            <Avatar size="xsmall" />
          </Link>
        </div>
      ) : (
        <div>
          <Button color="secondary">
            <Link href="/login">
              <LogInIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
