import { getAnalyticsDashboard } from '@/lib/api/analytics';
import { dashboard } from '@/types/api/analytics';
import { MyAnalyticsClient } from './MyAnalyticsClient';

export const MyAnalytics = async ({ token }: { token: string }) => {
  const analyticsDashboardData: dashboard = await getAnalyticsDashboard(token);

  const monthlyCategoryActivityTotal = analyticsDashboardData?.monthly_category_activity_total;
  const weeklyCategoryActivityTotal = analyticsDashboardData?.weekly_category_activity_total;

  return (
    <MyAnalyticsClient
      monthlyCategoryActivityTotal={monthlyCategoryActivityTotal}
      weeklyCategoryActivityTotal={weeklyCategoryActivityTotal}
    />
  );
};
