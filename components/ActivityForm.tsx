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
import { InputWithLabel } from './form/InputWithLabel';
import RunIcon from './icons/Run';
import { TextareaSimple } from './form/TextAreaSimple';
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
        <DialogTitle className="flex flex-row gap-1 rounded-sm border border-gray-300 px-2 py-1 text-sm font-medium">
          <RunIcon className="h-5 w-5" /> My Activity
        </DialogTitle>
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
        <TextareaSimple
          id="description"
          name="description"
          placeholder="Add description..."
          className="resize-none overflow-hidden focus:outline-none"
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
        <SubmitButton color="primary">Create Activity</SubmitButton>
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
