'use client';

import { Avatar } from '@/components/Avatar';
import { RequestItem } from '@/components/RequestItem';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FriendRequest, User } from '@/types/api/user';
import React, { useEffect, useState } from 'react';

export const FriendList = ({ token }: { token: string }) => {
  const [search, setSearch] = useState('');
  const [currentTab, setCurrentTab] = useState<'friend' | 'request'>('friend');
  const [friendsSearchResult, setFriendsSearchResult] = useState<User[]>([]);
  const [requestsSearchResult, setRequestsSearchResult] = useState<FriendRequest[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFriendsSearchResult() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/friends/search?query=${search}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Failed: ${response.status}`);
        }

        const data = await response.json();
        setFriendsSearchResult(data.friends);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error(error);
          setFriendsSearchResult([]);
        }
      } finally {
        setLoading(false);
      }
    }

    async function fetchRequestsSearchResult() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/friend-requests/search?query=${search}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`Failed: ${response.status}`);
        }

        const data = await response.json();
        setRequestsSearchResult(data.friend_requests ?? []);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error(error);
          setRequestsSearchResult([]);
        }
      } finally {
        setLoading(false);
      }
    }

    if (currentTab === 'friend') {
      fetchFriendsSearchResult();
    } else {
      fetchRequestsSearchResult();
    }

    return () => controller.abort();
  }, [debouncedSearch, token, currentTab]);

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
      <nav>
        <ul className="flex justify-between gap-2">
          <li
            onClick={() => {
              setCurrentTab('friend');
              setRequestsSearchResult([]);
              setSearch('');
              setDebouncedSearch('');
            }}
            className={cn(
              currentTab === 'friend' ? 'text-black' : 'text-gray-500',
              'cursor-pointer select-none',
            )}
          >
            Friend
          </li>
          <li
            onClick={() => {
              setCurrentTab('request');
              setFriendsSearchResult([]);
              setSearch('');
              setDebouncedSearch('');
            }}
            className={cn(
              currentTab === 'request' ? 'text-black' : 'text-gray-500',
              'cursor-pointer select-none',
            )}
          >
            Request
          </li>
        </ul>
      </nav>
      <ul className="flex flex-col">
        {currentTab === 'friend'
          ? friendsSearchResult.map((friend) => <FriendItem key={friend.id} friend={friend} />)
          : requestsSearchResult.map((request) => (
              <RequestItem key={request.id} request={request} />
            ))}
      </ul>
    </aside>
  );
};

const FriendItem = ({ friend }: { friend: User }) => {
  return (
    <li className="flex cursor-pointer items-center gap-5 rounded-sm p-2 hover:bg-gray-50">
      <Avatar size="small" user={friend ?? null} />
      <div>{friend.name}</div>
    </li>
  );
};
