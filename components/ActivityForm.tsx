'use client';

import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { ErrorMessage } from './form/ErrorMessage';
import { FormRow } from './form/FormRow';
import { Input } from './form/Input';
import { CreateActivityState } from '@/types/api/activity';
import { Button } from './buttons/Button';
import { SubmitButton } from './buttons/SubmitButton';
import { Category } from '@/types/api/category';
import { useRef, useState } from 'react';
import { SelectSimple } from './form/SelectSimple';
import { ChevronDownIcon } from 'lucide-react';
export const ActivityForm = ({
  state,
  formAction,
  categories,
}: {
  state: CreateActivityState;
  formAction: (formData: FormData) => void | Promise<void>;
  categories: Category[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  return (
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
        <DialogTitle>My Acticity</DialogTitle>
        <ChevronDownIcon className="size-4 rotate-270 text-black" />
        <DialogDescription className="text-black">New activity</DialogDescription>
      </DialogHeader>

      <FormRow>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          className="font-bold focus:outline-none"
        />
        <ErrorMessage>{state?.errors.title}</ErrorMessage>
      </FormRow>

      <FormRow>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Add description..."
          className="focus:outline-none"
        />
        <ErrorMessage>{state?.data.description}</ErrorMessage>
        <ErrorMessage>{state?.errors.description}</ErrorMessage>
      </FormRow>

      <CategoryAndDetailsFields categories={categories} state={state} />

      <hr />

      <DialogFooter>
        <DialogClose asChild>
          <Button color="transparent">Cancel</Button>
        </DialogClose>
        <SubmitButton color="primary">Create</SubmitButton>
      </DialogFooter>
    </form>
  );
};

const CategoryAndDetailsFields = ({
  categories,
  state,
}: {
  categories: Category[];
  state: CreateActivityState;
}) => {
  const [category, setCategory] = useState<Category>('Running' as unknown as Category);

  const handleCategoryChange = (value: string) => {
    setCategory(
      categories.find((c: Category) => String(c) === value) || ('Running' as unknown as Category),
    );
  };

  return (
    <>
      <InputFields category={category} />
      <SelectSimple
        items={categories.map((c: Category) => ({ value: String(c), label: String(c) }))}
        onValueChange={handleCategoryChange}
        id="category"
        name="category"
        required
      />
    </>
  );
};

const InputFields = ({ category }: { category: Category }) => {
  if (String(category) === 'Running') {
    return (
      <>
        <FormRow>
          <label htmlFor="distance">Distance (km)</label>
          <Input type="number" id="distance" name="distance" placeholder="Distance" />
        </FormRow>
        <FormRow>
          <label htmlFor="duration">Duration (minutes)</label>
          <Input type="number" id="duration" name="duration" placeholder="Duration" />
        </FormRow>
      </>
    );
  }
  if (String(category) === 'Walking') {
    return (
      <>
        <FormRow>
          <label htmlFor="distance">Distance (km)</label>
          <Input type="number" id="distance" name="distance" placeholder="Distance" />
        </FormRow>
        <FormRow>
          <label htmlFor="duration">Duration (minutes)</label>
          <Input type="number" id="duration" name="duration" placeholder="Duration" />
        </FormRow>
      </>
    );
  }
  if (String(category) === 'Cycling') {
    return (
      <>
        <FormRow>
          <label htmlFor="distance">Distance (km)</label>
          <Input type="number" id="distance" name="distance" placeholder="Distance" />
        </FormRow>
        <FormRow>
          <label htmlFor="duration">Duration (minutes)</label>
          <Input type="number" id="duration" name="duration" placeholder="Duration" />
        </FormRow>
      </>
    );
  }
  if (String(category) === 'Swimming') {
    return (
      <>
        <FormRow>
          <label htmlFor="distance">Distance (km)</label>
          <Input type="number" id="distance" name="distance" placeholder="Distance" />
        </FormRow>
        <FormRow>
          <label htmlFor="duration">Duration (minutes)</label>
          <Input type="number" id="duration" name="duration" placeholder="Duration" />
        </FormRow>
      </>
    );
  }
  if (String(category) === 'Hiking') {
    return (
      <>
        <FormRow>
          <label htmlFor="distance">Distance (km)</label>
          <Input type="number" id="distance" name="distance" placeholder="Distance" />
        </FormRow>
        <FormRow>
          <label htmlFor="duration">Duration (minutes) </label>
          <Input type="number" id="duration" name="duration" placeholder="Duration" />
        </FormRow>
        <FormRow>
          <label htmlFor="location">Location (optional)</label>
          <Input type="text" id="location" name="location" placeholder="eg. The Peak, Hong Kong" />
        </FormRow>
      </>
    );
  }
};
