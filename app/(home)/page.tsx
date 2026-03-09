import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserProfileCard } from './UserProfileCard';
import { WeatherCard } from './WeatherCard';

export default async function Home() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let latestActivityRes: Response;
  let activityCountRes: Response;
  try {
    [latestActivityRes, activityCountRes] = await Promise.all([
      fetch(`${process.env.API_URL}/api/activities/latest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${process.env.API_URL}/api/activities/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);
  } catch (error) {
    console.error(error);
    throw new Error(`Network error while fetching the latest activity: ${String(error)}`);
  }

  if (
    latestActivityRes.status === 401 ||
    latestActivityRes.status === 419 ||
    activityCountRes.status === 401 ||
    activityCountRes.status === 419
  ) {
    redirect('/login');
  }
  if (!latestActivityRes.ok) {
    throw new Error(
      `Failed to fetch the latest activity: ${latestActivityRes.status} ${latestActivityRes.statusText}`,
    );
  }

  if (!activityCountRes.ok) {
    throw new Error(
      `Failed to fetch the activity count: ${activityCountRes.status} ${activityCountRes.statusText}`,
    );
  }

  const latestActivityResJson = await latestActivityRes.json();
  const activityCountResJson = await activityCountRes.json();
  const latestActivity = latestActivityResJson.activity;
  const activityCount = activityCountResJson.count;

  return (
    <div className="grid grid-cols-[3fr_4fr_3fr] grid-rows-2 gap-2">
      <UserProfileCard latestActivity={latestActivity} activityCount={activityCount} />
      <section className="col-span-1 row-span-2 h-screen">
        <div className="bg-card mt-9 rounded-sm border border-gray-200 p-4">activities</div>
      </section>
      <WeatherCard />
      <section className="bg-card col-span-1 row-span-1 rounded-sm border border-gray-200 p-4">
        championships
      </section>
      <section className="bg-card col-span-1 row-span-1 rounded-sm border border-gray-200 p-4">
        events
      </section>
    </div>
  );
}
