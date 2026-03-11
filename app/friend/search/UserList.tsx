'use client';

import { Avatar } from '@/components/Avatar';
import { SubmitButton } from '@/components/buttons/SubmitButton';
import { Input } from '@/components/ui/input';
import { FriendRequest, User } from '@/types/api/user';
import React, { useActionState, useEffect, useState } from 'react';
import { sendFriendRequest } from '../action';
import { useUser } from '@/contexts/UserProvider';
import { RequestItem, RequestItemButton } from '@/components/RequestItem';

export const UserList = ({ token }: { token: string }) => {
  const { user: currentUser } = useUser();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState<User[]>([]);
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
        {searchResult &&
          searchResult.map((user) => (
            <UserItem key={user.id} user={user} currentUser={currentUser} />
          ))}
      </ul>
    </aside>
  );
};

const UserItem = ({ user, currentUser }: { user: User; currentUser: User | null }) => {
  const [state, formAction] = useActionState(sendFriendRequest, {
    message: '',
    error: '',
    ok: false,
    data: {},
  });
  const sentRequest = {
    ...user.friend_requests_sent.find(
      (request) => request.status === 'pending' && request.receiver_id === currentUser?.id,
    ),
    sender: user,
  } as FriendRequest;

  const requestHasAlreadyBeenSentByMe =
    user.friend_requests_received.some(
      (request) => request.status === 'pending' && request.sender_id === currentUser?.id,
    ) || state.ok;
  const isFriend = user.friends.some((friend) => friend.friend_id === currentUser?.id);
  const requestHasAlreadyBeenSentByHim = user.friend_requests_sent.some(
    (request) => request.status === 'pending' && request.receiver_id === currentUser?.id,
  );

  if (requestHasAlreadyBeenSentByHim) {
    return <RequestItem request={sentRequest ?? ({} as FriendRequest)} />;
  }

  return (
    <li className="flex cursor-pointer items-center justify-between gap-5 rounded-sm p-2 hover:bg-gray-50">
      <div className="flex items-center gap-5">
        <Avatar size="small" user={user} />
        <div>{user.name}</div>
      </div>
      <form className="flex items-center gap-2" action={formAction}>
        <input type="hidden" name="friendId" id="friendId" value={user.id.toString()} />
        {requestHasAlreadyBeenSentByMe && (
          <div className="text-xs text-gray-500">Request already sent</div>
        )}
        {isFriend && <div className="text-xs text-gray-500">Already friend</div>}
        {!requestHasAlreadyBeenSentByMe && !requestHasAlreadyBeenSentByHim && !isFriend && (
          <SubmitButton className="cursor-pointer rounded-sm bg-gray-100 p-2 text-gray-500 hover:bg-gray-200">
            Request
          </SubmitButton>
        )}
      </form>
    </li>
  );
};
