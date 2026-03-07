import AddActivityButton from '@/components/AddActivityButton';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MyActivities } from './MyActivities';
import { MyAnalytics } from './MyAnalytics';
import { Suspense } from 'react';
import { PaginationSimple } from '@/components/Pagination';
import { PER_PAGE } from '@/constants/initialStates';

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Activity({ searchParams }: PageProps) {
  const { page: pageNumber } = await searchParams;
  const page: number = parseInt(pageNumber ?? '1') || 1;

  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value;

  if (!token) redirect('/login');

  let activitiesRes: Response;
  let countRes: Response;

  try {
    [activitiesRes, countRes] = await Promise.all([
      fetch(`${process.env.API_URL}/api/activities/paginated?page=${page}&per_page=${PER_PAGE}`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${process.env.API_URL}/api/activities/count`, {
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);
  } catch (e) {
    throw new Error(`Network error while fetching activities: ${String(e)}`);
  }

  // 認証エラーだけログインへ
  if (
    activitiesRes.status === 401 ||
    activitiesRes.status === 419 ||
    countRes.status === 401 ||
    countRes.status === 419
  ) {
    redirect('/login');
  }

  // それ以外は通常エラー
  if (!activitiesRes.ok) {
    throw new Error(
      `Failed to fetch activities: ${activitiesRes.status} ${activitiesRes.statusText}`,
    );
  }
  if (!countRes.ok) {
    throw new Error(`Failed to fetch count: ${countRes.status} ${countRes.statusText}`);
  }

  const [activitiesJson, countJson] = await Promise.all([activitiesRes.json(), countRes.json()]);

  const activities = activitiesJson.data ?? [];
  const totalPages = Math.ceil(countJson.count / PER_PAGE);

  return (
    <section className="grid grid-cols-[9fr_6fr] space-y-6 gap-x-10">
      <main className="space-y-6">
        <header className="flex items-center gap-3">
          <h2 className="">My Activity</h2>
          <AddActivityButton />
        </header>

        <MyActivities activities={activities} />
        <PaginationSimple page={page} totalPages={totalPages} />
      </main>

      <aside>
        <Suspense fallback={<div>Loading...</div>}>
          <MyAnalytics token={token} />
        </Suspense>
      </aside>
    </section>
  );
}
