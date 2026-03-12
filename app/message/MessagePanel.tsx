import { useEffect, useState } from 'react';
import { MessageList } from './MessageList';
import { Message, Room } from '@/types/api/message';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';

export const MessagePanel = ({
  selectedRoom,
  token,
}: {
  selectedRoom: Room | null;
  token: string;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${selectedRoom?.id}/messages`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        setMessages(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedRoom) {
      fetchMessages();
    }
  }, [selectedRoom, token]);
  return (
    <div className="bg-card flex w-full flex-col rounded-r-sm border border-gray-200">
      {!selectedRoom ? (
        <div className="flex h-[calc(100vh-95px)] flex-col items-center justify-center gap-4">
          <h1 className="text-center text-sm font-medium text-gray-500">
            Select a message room to start chatting
          </h1>
        </div>
      ) : (
        <>
          <ChatHeader room={selectedRoom} />
          <MessageList messages={messages} />
          <MessageInput
            token={token}
            setMessages={setMessages}
            messages={messages}
            selectedRoom={selectedRoom}
          />
        </>
      )}
    </div>
  );
};
