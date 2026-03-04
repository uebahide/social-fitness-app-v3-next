import { ActivityType } from '@/types/api/activity';

export async function getAnalyticsDashboard(token: string) {
  const analytics = await fetch(`${process.env.API_URL}/api/analytics/activities/dashboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!analytics.ok) {
    console.log('get analytics dashboard failed: ', analytics.statusText);
    return {
      error: analytics.statusText,
    };
  }

  return await analytics.json();
}
