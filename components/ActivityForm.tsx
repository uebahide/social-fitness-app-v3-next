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
      <DialogHeader>
        <DialogTitle>Acticity Detail</DialogTitle>
        <DialogDescription>Create new activity</DialogDescription>
      </DialogHeader>

      <CategoryAndDetailsFields categories={categories} state={state} />

      <FormRow>
        <label htmlFor="title">Title (optional)</label>
        <Input type="text" id="title" name="title" placeholder="" />
        <ErrorMessage>{state?.errors.title}</ErrorMessage>
      </FormRow>

      <FormRow>
        <label htmlFor="description">Description (optional)</label>
        <Input type="text" id="description" name="description" placeholder="" />
        <ErrorMessage>{state?.data.description}</ErrorMessage>
        <ErrorMessage>{state?.errors.description}</ErrorMessage>
      </FormRow>

      <DialogFooter>
        <DialogClose asChild>
          <Button color="secondary">Cancel</Button>
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

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(
      categories.find((c: Category) => String(c) === event.target.value) ||
        ('Running' as unknown as Category),
    );
  };

  return (
    <>
      <FormRow>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={category ? String(category) : 'Running'}
          onChange={handleCategoryChange}
          className="h-8 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        >
          {categories.map((category: Category) => (
            <option key={String(category)} value={category}>
              {category}
            </option>
          ))}
        </select>
      </FormRow>

      {String(category) === 'Running' && (
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
      )}
      {String(category) === 'Walking' && (
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
      )}
      {String(category) === 'Cycling' && (
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
      )}
      {String(category) === 'Swimming' && (
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
      )}
      {String(category) === 'Hiking' && (
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
            <Input
              type="text"
              id="location"
              name="location"
              placeholder="eg. The Peak, Hong Kong"
            />
          </FormRow>
        </>
      )}
    </>
  );
};
