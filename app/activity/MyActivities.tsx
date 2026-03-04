'use client';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CategoryIcon } from '@/components/CategoryIcon';
import { ActivityType } from '@/types/api/activity';
import { Category } from '@/types/api/category';
import ActivityCard from '@/components/ActivityCard';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const MyActivities = ({
  categories,
  activities,
}: {
  categories: Category[];
  activities: ActivityType[];
}) => {
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);
  return (
    <div className="space-y-6">
      <CategoryFilter
        categories={categories}
        setCategoryFilter={setCategoryFilter}
        categoryFilter={categoryFilter}
      />
      <ActivityList activities={activities} categoryFilter={categoryFilter} />
    </div>
  );
};

function CategoryFilter({
  categories,
  setCategoryFilter,
  categoryFilter,
}: {
  categories: Category[];
  setCategoryFilter: (category: Category | null) => void;
  categoryFilter: Category | null;
}) {
  const handleCategoryFilter = (category: Category) => {
    setCategoryFilter(category);
    if (String(categoryFilter) === String(category)) {
      setCategoryFilter(null);
    } else {
      setCategoryFilter(category);
    }
  };
  return (
    <nav className="flex gap-2">
      {categories.map((category: Category) => {
        return (
          <div
            className={cn(
              'flex h-8 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 hover:shadow-md',
              String(categoryFilter) === String(category) ? 'bg-gray-200 shadow-md' : '',
            )}
            onClick={() => handleCategoryFilter(category)}
            key={String(category)}
          >
            <CategoryIcon
              category={String(category).toLowerCase()}
              className="cursor-pointer"
              size="small"
            />
          </div>
        );
      })}
    </nav>
  );
}

function ActivityList({
  activities,
  categoryFilter,
}: {
  activities: ActivityType[];
  categoryFilter: Category | null;
}) {
  const filteredActivities = categoryFilter
    ? activities.filter(
        (activity: ActivityType) =>
          String(activity.category).toLowerCase() === String(categoryFilter).toLowerCase(),
      )
    : activities;

  return (
    <article className="space-y-3">
      {filteredActivities?.length > 0 &&
        filteredActivities.map((activity: ActivityType) => {
          return <ActivityCard activity={activity} key={activity.id} />;
        })}
    </article>
  );
}
