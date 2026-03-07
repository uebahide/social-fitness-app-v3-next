'use client';

import { useActionState, useEffect, useState } from 'react';
import { createActivity } from '@/app/activity/action';
import { Category } from '@/types/api/category';
import DialogFormOpenButton from './DialogFormOpenButton';
import { FormRow } from './form/FormRow';
import { ErrorMessage } from './form/ErrorMessage';
import { TextareaSimple } from './form/TextAreaSimple';
import { InputWithLabel } from './form/InputWithLabel';
import { Input } from './form/Input';
import { SelectSimple } from './form/SelectSimple';

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
    <DialogFormOpenButton
      action={createActivity}
      initialState={createActivityInitialState}
      buttonText="+ New"
      dialogTitle="My Activity"
      dialogDescription="New Activity"
      subitButtonText="Create Activity"
    >
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
        <TextareaSimple
          id="description"
          name="description"
          placeholder="Add description..."
          className="resize-none overflow-hidden focus:outline-none"
        />
      </FormRow>

      <CategoryAndDetailsFields categories={categories} state={state} />
    </DialogFormOpenButton>
  );
}

const CategoryAndDetailsFields = ({
  categories,
  state,
}: {
  categories: Category[];
  state: CreateActivityState;
}) => {
  const [category, setCategory] = useState<Category>('null' as unknown as Category);

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
    return <DistanceAndDurationFields />;
  }
  if (String(category) === 'Walking') {
    return <DistanceAndDurationFields />;
  }
  if (String(category) === 'Cycling') {
    return <DistanceAndDurationFields />;
  }
  if (String(category) === 'Swimming') {
    return <DistanceAndDurationFields />;
  }
  if (String(category) === 'Hiking') {
    return (
      <>
        <DistanceAndDurationFields />
        <InputWithLabel label="Location" unit="optional">
          <Input type="text" id="location" name="location" placeholder="eg. The Peak, Hong Kong" />
        </InputWithLabel>
      </>
    );
  }
};

const DistanceAndDurationFields = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <InputWithLabel label="Distance" unit="km">
        <Input type="number" placeholder="0.0" id="distance" name="distance" />
      </InputWithLabel>

      <InputWithLabel label="Duration" unit="min">
        <Input type="number" placeholder="0" id="duration" name="duration" />
      </InputWithLabel>
    </div>
  );
};
