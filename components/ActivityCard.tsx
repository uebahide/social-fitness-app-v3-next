import { ActivityType } from '@/types/api/activity';
import { Avatar } from './Avatar';

export default function ActivityCard({ activity }: { activity: ActivityType }) {
  const created_user = activity.user;
  return (
    <div className="grid grid-cols-[50px_auto] grid-rows-2 gap-y-4 rounded-sm bg-white px-7 py-5 shadow-sm">
      <Avatar user={created_user} />
      <div>
        <p>{created_user.name}</p>
        <p>{activity.created_at}</p>
      </div>
      <div>icon</div>
      <div>
        <p>{activity.title}</p>
        <p>{activity.description}</p>
      </div>
    </div>
  );
}
