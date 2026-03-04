import { getAnalyticsDashboard } from '@/lib/api/analytics';
import { dashboard } from '@/types/api/analytics';
import { CategoryBreakDownChart } from './CategoryBreakDownChart';

export const MyAnalytics = async ({ token }: { token: string }) => {
  const analyticsDashboardData: dashboard = await getAnalyticsDashboard(token);

  const monthlyCategoryActivityTotal = analyticsDashboardData?.monthly_category_activity_total;
  const weeklyCategoryActivityTotal = analyticsDashboardData?.weekly_category_activity_total;

  console.log(monthlyCategoryActivityTotal);

  return (
    <div className="bg-card h-auto space-y-10 rounded-lg border border-gray-300 px-7 py-4 shadow-sm">
      <section className="flex items-center justify-center">
        <CategoryBreakDownChart
          monthlyData={monthlyCategoryActivityTotal}
          weeklyData={weeklyCategoryActivityTotal}
        />
      </section>

      <ul className="flex flex-col gap-4">
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
