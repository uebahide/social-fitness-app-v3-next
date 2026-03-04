'use client';

import { getCategoryColor } from '@/lib/utils';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

export const CategoryBreakDownChart = ({
  data,
}: {
  data: { category: string; total: number }[];
}) => {
  const dataWithColors = data.map((entry, index) => ({
    ...entry,
    fill: getCategoryColor(entry.category),
  }));

  return (
    <PieChart width={400} height={330}>
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
  );
};
