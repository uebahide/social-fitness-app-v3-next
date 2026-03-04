'use client';

import { CategoryBreakDownChart } from './CategoryBreakDownChart';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { dailyDistanceAndDurationValues, CategoryActivityTotal } from '@/types/api/analytics';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const MyAnalyticsClient = ({
  last7DaysCategoryActivityTotal,
  last30DaysCategoryActivityTotal,
  last60DaysCategoryActivityTotal,
  last90DaysCategoryActivityTotal,
  dailyDistanceAndDurationValues,
}: {
  last7DaysCategoryActivityTotal: CategoryActivityTotal[];
  last30DaysCategoryActivityTotal: CategoryActivityTotal[];
  last60DaysCategoryActivityTotal: CategoryActivityTotal[];
  last90DaysCategoryActivityTotal: CategoryActivityTotal[];
  dailyDistanceAndDurationValues: dailyDistanceAndDurationValues[];
}) => {
  const [days, setDays] = useState<number>(7);
  const categoryBreakDownData =
    days === 7
      ? last7DaysCategoryActivityTotal
      : days === 30
        ? last30DaysCategoryActivityTotal
        : days === 60
          ? last60DaysCategoryActivityTotal
          : last90DaysCategoryActivityTotal;

  const trendData = dailyDistanceAndDurationValues.slice(0, days).map((item) => ({
    name: item.date,
    distance: item.distance,
  }));

  return (
    <div className="bg-card h-auto space-y-10 rounded-lg border border-gray-300 px-7 py-4 shadow-sm focus-within:outline-none">
      <nav className="flex justify-end gap-2">
        <select
          className="bg-card rounded-lg border border-gray-300 px-2 py-1"
          onChange={(e) => setDays(Number(e.target.value))}
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="60">Last 60 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </nav>

      <ul className="flex flex-col gap-4">
        <li>
          <LineChart width={400} height={250} data={trendData} className="">
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />
            <YAxis />

            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="distance" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </li>

        <li>
          <CategoryBreakDownChart data={categoryBreakDownData} />
        </li>

        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
      </ul>
    </div>
  );
};
