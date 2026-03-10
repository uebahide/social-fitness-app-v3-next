'use client';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CheckCircle, CheckIcon, XCircle, XIcon } from 'lucide-react';
import React, { useState } from 'react';

export const FriendList = () => {
  const [search, setSearch] = useState('');
  const [currentTab, setCurrentTab] = useState<'friend' | 'request'>('friend');

  const friendList = [
    {
      id: 1,
      name: 'John Doe',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'John Doe',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'John Doe',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'John Doe',
      image: 'https://via.placeholder.com/150',
    },
  ];

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

  return (
    <aside className="bg-card flex h-screen flex-col gap-4 rounded-sm border border-gray-200 p-3">
      <Input id="search" name="search" type="text" placeholder="Search" className="w-full" />
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
          ? friendList.map((friend) => <FriendItem key={friend.id} friend={friend} />)
          : requestList.map((request) => <RequestItem key={request.id} request={request} />)}
      </ul>
    </aside>
  );
};

const FriendItem = ({ friend }: { friend: { id: number; name: string; image: string } }) => {
  return (
    <li className="flex cursor-pointer items-center gap-5 rounded-sm p-2 hover:bg-gray-50">
      <Avatar size="small" src={friend.image} />
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
