import { User } from './user';

export type ActivityType = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user: User;
};
