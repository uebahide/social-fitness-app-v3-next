'use client';

import { logout } from '@/app/(auth)/action';
import { useActionState } from 'react';
import { Button } from './buttons/Button';

export const LogoutButton = () => {
  const [state, formAction] = useActionState(logout, null);
  return (
    <form action={formAction}>
      <Button color="secondary" type="submit" className="w-fit rounded-lg text-white">
        logout
      </Button>
    </form>
  );
};
