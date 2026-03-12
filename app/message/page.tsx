import React from 'react';

import { MessagePanel } from './MessagePanel';
import { MessageSidebar } from './MessageSidebar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MessageClient } from './MessageClient';

export default async function MessagePage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value || '';

  let res: Response;

  try {
    res = await fetch(`${process.env.API_URL}/api/rooms`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error(`Network error while fetching messagerooms: ${String(e)}`);
  }

  // 認証エラーだけログインへ
  if (res.status === 401 || res.status === 419) {
    redirect('/login');
  }

  if (!res.ok) {
    throw new Error('Failed to fetch rooms');
  }

  // それ以外は通常エラー
  if (!res.ok) {
    throw new Error(`Failed to fetch activities: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const rooms = data.rooms;

  return <MessageClient rooms={rooms} token={token} />;
}
