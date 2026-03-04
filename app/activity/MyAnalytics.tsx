import { getAnalyticsDashboard } from '@/lib/api/analytics';
import { dashboard } from '@/types/api/analytics';
import { MyAnalyticsClient } from './MyAnalyticsClient';

export const MyAnalytics = async ({ token }: { token: string }) => {
  const analyticsDashboardData: dashboard = await getAnalyticsDashboard(token);

  const last7DaysCategoryActivityTotal = analyticsDashboardData?.last7DaysCategoryActivityTotal;
  const last30DaysCategoryActivityTotal = analyticsDashboardData?.last30DaysCategoryActivityTotal;
  const last60DaysCategoryActivityTotal = analyticsDashboardData?.last60DaysCategoryActivityTotal;
  const last90DaysCategoryActivityTotal = analyticsDashboardData?.last90DaysCategoryActivityTotal;
  const dailyDistanceAndDurationValues = analyticsDashboardData?.dailyDistanceAndDurationValues;

  return (
    <MyAnalyticsClient
      last7DaysCategoryActivityTotal={last7DaysCategoryActivityTotal}
      last30DaysCategoryActivityTotal={last30DaysCategoryActivityTotal}
      last60DaysCategoryActivityTotal={last60DaysCategoryActivityTotal}
      last90DaysCategoryActivityTotal={last90DaysCategoryActivityTotal}
      dailyDistanceAndDurationValues={dailyDistanceAndDurationValues}
    />
  );
};
