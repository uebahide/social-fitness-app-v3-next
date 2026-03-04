'use client';

import { Button } from '@/components/buttons/Button';
import { CategoryBreakDownChart } from './CategoryBreakDownChart';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const MyAnalyticsClient = ({
  monthlyCategoryActivityTotal,
  weeklyCategoryActivityTotal,
}: {
  monthlyCategoryActivityTotal: { category: string; total: number }[];
  weeklyCategoryActivityTotal: { category: string; total: number }[];
}) => {
  const [type, setType] = useState<'weekly' | 'monthly'>('weekly');
  const categoryBreakDownData =
    type === 'monthly' ? monthlyCategoryActivityTotal : weeklyCategoryActivityTotal;

  return (
    <div className="bg-card h-auto space-y-10 rounded-lg border border-gray-300 px-7 py-4 shadow-sm">
      <nav className="flex justify-end gap-2">
        <Button
          type="button"
          color="secondary"
          className={cn(
            'bg-card hover:bg-brand-secondary-200',
            type === 'weekly' && 'bg-brand-secondary-200 shadow-md',
          )}
          onClick={() => setType('weekly')}
        >
          Weekly
        </Button>
        <Button
          type="button"
          color="secondary"
          className={cn(
            'bg-card hover:bg-brand-secondary-200',
            type === 'monthly' && 'bg-brand-secondary-200 shadow-md',
          )}
          onClick={() => setType('monthly')}
        >
          Monthly
        </Button>
      </nav>
      <ul className="flex flex-col gap-4">
        <li>
          <CategoryBreakDownChart data={categoryBreakDownData} />
        </li>

        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
  );
};
