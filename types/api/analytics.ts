export type dashboard = {
  monthly_activity_total: number;
  weekly_activity_total: number;
  monthly_category_activity_total: { category: string; total: number }[];
  weekly_category_activity_total: { category: string; total: number }[];
  daily_distance_and_duration_values: [string, number, number][];
};
