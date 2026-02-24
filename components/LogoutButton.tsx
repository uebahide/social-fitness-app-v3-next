"use client";

import { logout } from "@/app/(auth)/action";
import { useActionState } from "react";

export const LogoutButton = () => {
  const [state, formAction] = useActionState(logout, null);
  return (
    <form action={formAction}>
      <button
        className="cursor-pointer shadow-lg m-2 px-2 bg-brand-secondary-400 rounded-lg text-white hover:bg-brand-secondary-500"
        type="submit"
      >
        logout
      </button>
    </form>
  );
};
