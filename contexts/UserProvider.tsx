import { User } from '@/types/api/user';
import { createContext, useContext, useState } from 'react';

type UserState = {
  user: User | null;
};

const userContext = createContext<UserState | undefined>(undefined);

export const UserProvider = ({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(initialUser);
  return <userContext.Provider value={{ user }}>{children}</userContext.Provider>;
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
