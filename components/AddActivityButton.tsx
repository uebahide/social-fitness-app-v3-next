'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './buttons/Button';
import { useActionState, useEffect, useState } from 'react';
import { createActivity } from '@/app/activity/action';
import { ActivityForm } from './ActivityForm';
import { Category } from '@/types/api/category';

const createActivityInitialState = {
  errors: {},
  message: '',
  data: {
    title: '',
    description: '',
    category: '',
    details: {},
  },
  ok: false,
};

export type CreateActivityState = typeof createActivityInitialState;

export default function AddActivityButton({ categories }: { categories: Category[] }) {
  const [state, formAction] = useActionState(createActivity, createActivityInitialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.ok) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          color="secondary"
          className="h-7 w-fit border border-gray-300 bg-gray-100 shadow-sm hover:border-gray-300 hover:bg-gray-200"
        >
          + New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <ActivityForm
          state={state as CreateActivityState}
          formAction={formAction}
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
}
