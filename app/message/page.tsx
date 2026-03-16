import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MessageClient } from './MessageClient';

export default async function MessagePage({
  searchParams,
}: {
  searchParams: Promise<{ friendId?: string }>;
}) {
  const { friendId } = await searchParams;
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value || '';

  if (friendId) {
    const parsedFriendId = Number(friendId);

    if (!Number.isInteger(parsedFriendId)) {
      throw new Error(`Invalid friendId: ${friendId}`);
    }

    let isRoomExists: Response;
    try {
      isRoomExists = await fetch(`${process.env.API_URL}/api/rooms/${parsedFriendId}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      throw new Error(`Network error while checking if room exists: ${String(e)}`);
    }

    if (isRoomExists.status === 401 || isRoomExists.status === 419) {
      redirect('/login');
    }

    if (isRoomExists.status === 404) {
      let createRoom: Response;
      try {
        createRoom = await fetch(`${process.env.API_URL}/api/rooms`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            friend_id: parsedFriendId,
            type: 'private',
          }),
        });
      } catch (e) {
        throw new Error(`Network error while creating room: ${String(e)}`);
      }

      if (createRoom.status === 401 || createRoom.status === 419) {
        redirect('/login');
      }

      if (!createRoom.ok) {
        const text = await createRoom.text();
        throw new Error(
          `Failed to create room: ${createRoom.status} ${createRoom.statusText} ${text}`,
        );
      }
    } else if (!isRoomExists.ok) {
      const text = await isRoomExists.text();
      throw new Error(
        `Failed to check room: ${isRoomExists.status} ${isRoomExists.statusText} ${text}`,
      );
    }
  }

  let roomsRes: Response;

  try {
    roomsRes = await fetch(`${process.env.API_URL}/api/rooms`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error(`Network error while fetching message rooms: ${String(e)}`);
  }

  if (roomsRes.status === 401 || roomsRes.status === 419) {
    redirect('/login');
  }

  if (!roomsRes.ok) {
    const text = await roomsRes.text();
    throw new Error(`Failed to fetch rooms: ${roomsRes.status} ${roomsRes.statusText} ${text}`);
  }

  const data = await roomsRes.json();
  const rooms = data.rooms;

  return <MessageClient rooms={rooms} token={token} friendId={friendId} />;
}
