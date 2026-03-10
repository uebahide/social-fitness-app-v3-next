import { cookies } from 'next/headers';
import { FriendList } from './FriendList';
import { redirect } from 'next/navigation';

export default async function FriendPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  let friendRes: Response;

  try {
    [friendRes] = await Promise.all([
      fetch(`${process.env.API_URL}/api/friends`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);
  } catch (e) {
    throw new Error(`Network error while fetching friends: ${String(e)}`);
  }

  if (friendRes.status === 401 || friendRes.status === 419) {
    redirect('/login');
  }

  const friendJson = await friendRes.json();
  const friends = friendJson.friends;

  return (
    <div className="grid grid-cols-[3fr_7fr] gap-4">
      <FriendList token={token ?? ''} friends={friends} />
      <article>
        <div>Image</div>
        <div>Name</div>
      </article>
    </div>
  );
}
