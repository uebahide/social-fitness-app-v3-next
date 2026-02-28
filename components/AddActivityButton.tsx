'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './buttons/Button';
import { FormRow } from './authForm/FormRow';
import { Input } from './authForm/Input';
import { SubmitButton } from './buttons/SubmitButton';
import { ErrorMessage } from './authForm/ErrorMessage';
import { useActionState, useEffect, useState } from 'react';
import { createActivity } from '@/app/activity/action';

const initialState = {
  errors: {},
  message: '',
  data: {
    title: '',
    description: '',
  },
  ok: false,
};

export default function AddActivityButton() {
  const [state, formAction] = useActionState(createActivity, initialState);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.ok) {
      setOpen(false);
    }
  }, [state?.ok]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" color="secondary" onClick={() => console.log('open dialog')}>
          + Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Acticity Detail</DialogTitle>
            <DialogDescription>Create new activity</DialogDescription>
          </DialogHeader>
          <FormRow>
            <label htmlFor="title">Activity Name</label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="eg. Running, Cycling..."
              required
            />
            <ErrorMessage>{state?.data.title}</ErrorMessage>
          </FormRow>
          <FormRow>
            <label htmlFor="description">Description</label>
            <Input type="text" id="description" name="description" placeholder="eg. 10km/h..." />
            <ErrorMessage>{state?.data.description}</ErrorMessage>
          </FormRow>
          <DialogFooter>
            <DialogClose asChild>
              <Button color="secondary">Cancel</Button>
            </DialogClose>
            <SubmitButton color="primary">Create</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
