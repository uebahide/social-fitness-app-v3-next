'use client';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { User } from '@/types/api/user';
import { CheckCircle, CheckIcon, XCircle, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export const FriendList = ({ token, friends }: { token: string; friends: User[] }) => {
  const [search, setSearch] = useState('');
  const [currentTab, setCurrentTab] = useState<'friend' | 'request'>('friend');
  const [searchResult, setSearchResult] = useState<User[]>([]);
  friends = searchResult.length > 0 ? searchResult : friends;

  const requestList = [
    {
      id: 5,
      name: 'Jane Doe',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 6,
      name: 'Jane Doe',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 7,
      name: 'Jane Doe',
      image: 'https://via.placeholder.com/150',
    },
  ];

  useEffect(() => {
    async function fetchSearchResult() {
      const response = await fetch(`${process.env.API_URL}/api/friends/search?query=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSearchResult(data);
    }
    fetchSearchResult();
  }, [search]);

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
      <nav>
        <ul className="flex justify-between gap-2">
          <li
            onClick={() => setCurrentTab('friend')}
            className={cn(
              currentTab === 'friend' ? 'text-black' : 'text-gray-500',
              'cursor-pointer select-none',
            )}
          >
            Friend
          </li>
          <li
            onClick={() => setCurrentTab('request')}
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
          ? friends.map((friend) => <FriendItem key={friend.id} friend={friend} />)
          : requestList.map((request) => <RequestItem key={request.id} request={request} />)}
      </ul>
    </aside>
  );
};

const FriendItem = ({ friend }: { friend: User }) => {
  return (
    <li className="flex cursor-pointer items-center gap-5 rounded-sm p-2 hover:bg-gray-50">
      <Avatar size="small" src={friend.image_path} />
      <div>{friend.name}</div>
    </li>
  );
};

const RequestItem = ({ request }: { request: { id: number; name: string; image: string } }) => {
  return (
    <li className="flex cursor-pointer items-center justify-between gap-5 rounded-sm p-2 hover:bg-gray-50">
      <div className="flex items-center gap-5">
        <Avatar size="small" src={request.image} />
        <div>{request.name}</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200">
          <CheckIcon />
        </button>
        <button className="cursor-pointer rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200">
          <XIcon />
        </button>
      </div>
    </li>
  );
};
