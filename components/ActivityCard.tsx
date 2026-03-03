import { ActivityType } from '@/types/api/activity';
import { Avatar } from './Avatar';
import { getTimeOfDay, getUnit, uppercaseFirstLetter } from '@/lib/utils';

export default function ActivityCard({ activity }: { activity: ActivityType }) {
  const created_user = activity.user;
  const details = activity.details;
  return (
    <article className="rounded-sm bg-white px-7 py-5 shadow-sm">
      <main className="r mb-10 grid grid-cols-[50px_auto] grid-rows-[1fr_auto] space-y-4 gap-x-6">
        <span className="flex justify-center">
          <Avatar user={created_user} />
        </span>
        <header>
          <p className="text-md font-medium">{created_user.name}</p>
          <p className="text-xs text-gray-500">{activity.created_at}</p>
        </header>
        <div className="flex justify-center">icon</div>

        <section className="space-y-2">
          <h2 className="text-2xl font-medium">
            {activity.title
              ? activity.title
              : getTimeOfDay(activity.created_at) + ' ' + uppercaseFirstLetter(activity.category)}
          </h2>
          <ul className="flex gap-2">
            <li className="flex flex-col border-r border-gray-200 pr-3">
              <span className="text-sm text-gray-500">Category</span>
              <span className="text-xl font-medium">{uppercaseFirstLetter(activity.category)}</span>
            </li>
            {details &&
              Object.entries(details).map(([key, value]) => (
                <li className="flex flex-col border-r border-gray-200 px-3" key={key}>
                  <span className="text-sm text-gray-500">{uppercaseFirstLetter(key)}</span>
                  <p className="flex items-end gap-1 text-xl font-medium">
                    <span>{value ? value.toString() : '　'}</span>
                    <span className="text-sm text-gray-500">
                      {getUnit(key as 'duration' | 'distance')}
                    </span>
                  </p>
                </li>
              ))}
          </ul>
        </section>
      </main>
      <hr />
      <footer className="mt-5 flex flex-col gap-2">
        <span className="text-sm text-gray-500">Description</span>
        <span className="">{activity.description}</span>
      </footer>
    </article>
  );
}
