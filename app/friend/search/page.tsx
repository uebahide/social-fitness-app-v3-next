import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserList } from './UserList';

export default async function FriendPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  return (
    <div className="grid grid-cols-[3fr_7fr] gap-4">
      <UserList token={token ?? ''} />
      <article>
        <div>Image</div>
        <div>Name</div>
      </article>
    </div>
  );
}
