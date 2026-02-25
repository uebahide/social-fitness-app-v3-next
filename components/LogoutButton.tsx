'use client';

import { logout } from '@/app/(auth)/action';
import { useActionState } from 'react';

export const LogoutButton = () => {
  const [state, formAction] = useActionState(logout, null);
  return (
    <form action={formAction}>
      <button
        className="bg-brand-secondary-400 hover:bg-brand-secondary-500 m-2 cursor-pointer rounded-lg px-2 text-white shadow-lg"
        type="submit"
      >
        logout
      </button>
    </form>
  );
};
