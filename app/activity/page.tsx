import ActivityCard from '@/components/ActivityCard';
import AddActivityButton from '@/components/AddActivityButton';
import { Input } from '@/components/authForm/Input';
import { Button } from '@/components/buttons/Button';
import { ActivityType } from '@/types/api/activity';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Activity() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  let res: Response;

  try {
    res = await fetch(`${process.env.API_URL}/api/activities`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {
    throw new Error(`Network error while fetching activities: ${String(e)}`);
  }

  if (!res.ok) {
    redirect('/login');
  }

  const activities = await res.json();
  // const activities = ['activity1', 'activity2', 'activity3'];

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <AddActivityButton />
        <Input id="search" name="search" placeholder="search" className="bg-white" />
        <Button color="primary">Filter</Button>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-5">
        <div className="space-y-4">
          {activities.map((activity: ActivityType) => {
            return <ActivityCard activity={activity} key={activity.id} />;
          })}
        </div>

        <div>analytics</div>
      </div>
    </div>
  );
}
