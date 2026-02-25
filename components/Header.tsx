'use client';

import { useUser } from '@/contexts/UserProvider';
import { LogoutButton } from './LogoutButton';
import { useEffect } from 'react';

export default function Header() {
  const { user, setUser } = useUser();

  return (
    <div className="flex h-10 justify-end border-b border-gray-200">{user && <LogoutButton />}</div>
  );
}
