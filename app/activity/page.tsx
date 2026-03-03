import ActivityCard from '@/components/ActivityCard';
import AddActivityButton from '@/components/AddActivityButton';
import { ActivityType } from '@/types/api/activity';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CategoryIcon } from '@/components/CategoryIcon';
import { Category } from '@/types/api/category';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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

  const activities = activitiesJson.data ?? [];

  return (
    <section className="grid grid-cols-[2fr_1fr] gap-5 space-y-6">
      <main className="space-y-6">
        <header className="flex items-center gap-3">
          <h2 className="">My Activity</h2>
          <AddActivityButton categories={categories} />
        </header>
        <nav className="flex gap-2">
          {categories.map((category: Category) => {
            return (
              <Tooltip key={String(category)}>
                <TooltipTrigger asChild>
                  <div className="flex h-8 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200">
                    <CategoryIcon category={String(category).toLowerCase()} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{String(category)}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
        <article className="space-y-4">
          {activities?.length > 0 &&
            activities.map((activity: ActivityType) => {
              return <ActivityCard activity={activity} key={activity.id} />;
            })}
        </article>
      </main>
      <aside className="grid grid-cols-[2fr_1fr] gap-5">
        <div>analytics</div>
      </aside>
    </section>
  );
}
