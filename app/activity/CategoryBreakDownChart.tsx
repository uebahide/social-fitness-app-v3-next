'use client';

import { getCategoryColor } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

export const CategoryBreakDownChart = ({
  monthlyData,
  weeklyData,
}: {
  monthlyData: { category: string; total: number }[];
  weeklyData: { category: string; total: number }[];
}) => {
  const [type, setType] = useState<'weekly' | 'monthly'>('weekly');
  const data = type === 'monthly' ? monthlyData : weeklyData;

  const dataWithColors = data.map((entry, index) => ({
    ...entry,
    fill: getCategoryColor(entry.category),
  }));

  return (
    <div>
      <PieChart width={400} height={300}>
        <Pie
          data={dataWithColors}
          dataKey="total"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        />

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};
