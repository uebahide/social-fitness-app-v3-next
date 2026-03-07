'use client';

import { logout } from '@/app/(auth)/action';
import { useActionState } from 'react';
import { Button } from './buttons/Button';
import { SubmitButton } from './buttons/SubmitButton';
import { LogOutIcon } from 'lucide-react';

export const LogoutButton = () => {
  const [state, formAction] = useActionState(logout, null);
  return (
    <form action={formAction}>
      <SubmitButton color="secondary" className="w-fit rounded-sm">
        <LogOutIcon className="h-4 w-4" />
      </SubmitButton>
    </form>
  );
};
