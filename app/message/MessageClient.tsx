'use client';

import React, { useEffect, useState } from 'react';
import { MessagePanel } from './MessagePanel';
import { MessageSidebar } from './MessageSidebar';
import { Room } from '@/types/api/message';

export const MessageClient = ({ rooms, token }: { rooms: Room[]; token: string }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  return (
    <div className="grid grid-cols-[4fr_9fr]">
      <MessageSidebar rooms={rooms} setSelectedRoom={setSelectedRoom} selectedRoom={selectedRoom} />
      <MessagePanel selectedRoom={selectedRoom} token={token} />
    </div>
  );
};
