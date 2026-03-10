'use client';

import { Avatar } from '@/components/Avatar';
import { Input } from '@/components/ui/input';
import { User } from '@/types/api/user';
import React, { useEffect, useState } from 'react';

export const UserList = ({ token }: { token: string }) => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(false);

  console.log('TOKEN:', token);
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSearchResult() {
      if (!debouncedSearch) {
        setSearchResult([]);
        return;
      }

      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/search?query=${encodeURIComponent(debouncedSearch)}`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Failed: ${response.status}`);
        }

        const data = await response.json();
        setSearchResult(data.users ?? []);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error(error);
          setSearchResult([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResult();

    return () => controller.abort();
  }, [debouncedSearch, token]);

  console.log(search);
  console.log(searchResult);
  return (
    <aside className="bg-card flex h-screen flex-col gap-4 rounded-sm border border-gray-200 p-3">
      <Input
        id="search"
        name="search"
        type="text"
        placeholder="Search"
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="flex flex-col">
        {searchResult && searchResult.map((user) => <UserItem key={user.id} user={user} />)}
      </ul>
    </aside>
  );
};

const UserItem = ({ user }: { user: User }) => {
  return (
    <li className="flex cursor-pointer items-center gap-5 rounded-sm p-2 hover:bg-gray-50">
      <Avatar size="small" src={user.image_path} />
      <div>{user.name}</div>
    </li>
  );
};
