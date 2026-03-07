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
import React, { useActionState, useEffect, useRef, useState } from 'react';
import { Category } from '@/types/api/category';
import { ChevronDownIcon } from 'lucide-react';
import { SubmitButton } from './buttons/SubmitButton';

export default function DialogFormOpenButton({
  action,
  initialState,
  buttonText,
  dialogTitle,
  dialogDescription,
  subitButtonText,
  children,
}: {
  categories: Category[];
  action: (state: any) => any | Promise<any>;
  buttonText: string | React.ReactNode;
  initialState: any;
  dialogTitle: string | React.ReactNode;
  dialogDescription: string | React.ReactNode;
  subitButtonText: string | React.ReactNode;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) {
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" color="secondary">
          {/* + New */}
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form
          ref={formRef}
          action={formAction}
          className="space-y-4"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
              e.preventDefault();
              formRef.current?.requestSubmit();
            }
          }}
        >
          <DialogHeader className="flex flex-row items-center gap-2">
            <DialogTitle className="flex flex-row gap-1 rounded-sm border border-gray-300 px-2 py-1 text-sm font-medium">
              {/* <RunIcon className="h-5 w-5" /> My Activity */}
              {dialogTitle}
            </DialogTitle>
            <ChevronDownIcon className="size-4 rotate-270 text-black" />
            <DialogDescription className="text-black">{dialogDescription}</DialogDescription>
          </DialogHeader>

          {children}

          <hr />

          <DialogFooter>
            <DialogClose asChild>
              <Button color="transparent">Cancel</Button>
            </DialogClose>
            <SubmitButton color="primary">{subitButtonText}</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
