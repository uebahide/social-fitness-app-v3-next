'use client';

import { Avatar } from '@/components/Avatar';
import { Input } from '@/components/ui/input';
import { useUser } from '@/contexts/UserProvider';
import { cn } from '@/lib/utils';
import { Room } from '@/types/api/message';
import { useMemo, useState } from 'react';

export const MessageSidebar = ({
  rooms,
  setSelectedRoom,
  selectedRoom,
}: {
  rooms: Room[];
  setSelectedRoom: (room: Room) => void;
  selectedRoom: Room | null;
}) => {
  const { user: currentUser } = useUser();
  const [search, setSearch] = useState('');
  const filteredRooms = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return rooms.filter((room) => {
      const friend = room.users.find((user) => user.id !== currentUser?.id);

      if (!friend) return false;
      if (!keyword) return true;

      return friend.name.toLowerCase().includes(keyword);
    });
  }, [rooms, search, currentUser]);
  return (
    <aside className="bg-card flex flex-col gap-4 rounded-l-sm border border-r-0 border-gray-200 p-3">
      <Input
        id="search"
        name="search"
        type="text"
        placeholder="Search"
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="flex flex-col gap-3">
        {filteredRooms.map((room) => (
          <RoomListItem
            key={room.id}
            room={room}
            setSelectedRoom={setSelectedRoom}
            selectedRoom={selectedRoom}
          />
        ))}
      </ul>
    </aside>
  );
};

const RoomListItem = ({
  room,
  setSelectedRoom,
  selectedRoom,
}: {
  room: Room;
  setSelectedRoom: (room: Room) => void;
  selectedRoom: Room | null;
}) => {
  const { user: currentUser } = useUser();
  const friend = room.users.find((user) => user.id !== currentUser?.id);
  return (
    <li
      key={room.id}
      className={cn(
        'ml-2 flex cursor-pointer items-center gap-2 overflow-y-auto rounded-sm p-2 hover:bg-gray-100',
        selectedRoom?.id === room.id ? 'bg-gray-100' : 'hover:bg-gray-100',
      )}
      onClick={() => setSelectedRoom(room)}
    >
      <Avatar size="small" user={friend} />
      <section className="flex flex-col gap-1">
        <h3 className="text-xs font-medium">{friend?.name}</h3>
        <p className="text-xs text-gray-500">{room.latest_message?.body}</p>
      </section>
    </li>
  );
};
