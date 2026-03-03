import { CreateActivityState } from '@/types/api/activity';

export const createActivityInitialState: CreateActivityState = {
  errors: {},
  message: '',
  data: { title: '', description: '', category: '' },
  ok: false,
};
