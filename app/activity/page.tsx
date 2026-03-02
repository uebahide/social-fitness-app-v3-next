import ActivityCard from '@/components/ActivityCard';
import AddActivityButton from '@/components/AddActivityButton';
import { Input } from '@/components/form/Input';
import { Button } from '@/components/buttons/Button';
import { ActivityType } from '@/types/api/activity';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Activity() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!token) redirect('/login');

  let activitiesRes: Response;
  let categoriesRes: Response;

  try {
    [activitiesRes, categoriesRes] = await Promise.all([
      fetch(`${process.env.API_URL}/api/activities`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${process.env.API_URL}/api/categories`, {
        next: { revalidate: 3600 }, // 1 hour
        headers: {
          Accept: 'application/json',
        },
      }),
    ]);
  } catch (e) {
    throw new Error(`Network error while fetching activities: ${String(e)}`);
  }

  // 認証エラーだけログインへ
  if (activitiesRes.status === 401 || activitiesRes.status === 419) {
    redirect('/login');
  }

  // それ以外は通常エラー
  if (!activitiesRes.ok) {
    throw new Error(
      `Failed to fetch activities: ${activitiesRes.status} ${activitiesRes.statusText}`,
    );
  }
  if (!categoriesRes.ok) {
    throw new Error(
      `Failed to fetch categories: ${categoriesRes.status} ${categoriesRes.statusText}`,
    );
  }

  const [activitiesJson, categories] = await Promise.all([
    activitiesRes.json(),
    categoriesRes.json(),
  ]);

  const activities = activitiesJson.data;

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <AddActivityButton categories={categories} />
        <Input id="search" name="search" placeholder="search" className="bg-white" />
        <Button color="primary">Filter</Button>
      </div>
      <div className="grid grid-cols-[2fr_1fr] gap-5">
        <div className="space-y-4">
          {activities?.length > 0 &&
            activities.map((activity: ActivityType) => {
              return <ActivityCard activity={activity} key={activity.id} />;
            })}
        </div>

        <div>analytics</div>
      </div>
    </div>
  );
}
