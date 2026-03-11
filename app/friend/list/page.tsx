import { cookies } from 'next/headers';
import { FriendList } from './FriendList';
import { redirect } from 'next/navigation';
import { Friend } from '@/types/api/user';

export default async function FriendPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  let friendRes: Response;
  let requestRes: Response;

  try {
    [friendRes, requestRes] = await Promise.all([
      fetch(`${process.env.API_URL}/api/friends`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${process.env.API_URL}/api/friend-requests/received`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);
  } catch (e) {
    throw new Error(`Network error while fetching friends and requests: ${String(e)}`);
  }

  if (
    friendRes.status === 401 ||
    friendRes.status === 419 ||
    requestRes.status === 401 ||
    requestRes.status === 419
  ) {
    redirect('/login');
  }

  const friendJson = await friendRes.json();
  const requestJson = await requestRes.json();
  const friends = friendJson.friends.map((friend_table: Friend) => friend_table.friend);
  const requests = requestJson.received_friend_requests;

  return (
    <div className="grid grid-cols-[3fr_7fr] gap-4">
      <FriendList friends={friends} requests={requests} />
      <article>
        <div>Image</div>
        <div>Name</div>
      </article>
    </div>
  );
}
