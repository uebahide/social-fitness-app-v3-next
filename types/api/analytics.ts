export type dashboard = {
  last7DaysActivityTotal: CategoryActivityTotal[];
  last30DaysActivityTotal: CategoryActivityTotal[];
  last60DaysActivityTotal: CategoryActivityTotal[];
  last90DaysActivityTotal: CategoryActivityTotal[];
  last7DaysCategoryActivityTotal: CategoryActivityTotal[];
  last30DaysCategoryActivityTotal: CategoryActivityTotal[];
  last60DaysCategoryActivityTotal: CategoryActivityTotal[];
  last90DaysCategoryActivityTotal: CategoryActivityTotal[];
  dailyDistanceAndDurationValues: dailyDistanceAndDurationValues[];
};

export type CategoryActivityTotal = {
  category: string;
  total: number;
};

export type dailyDistanceAndDurationValues = {
  date: string;
  distance: number;
  duration: number;
};
