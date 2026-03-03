import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uppercaseFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const unitMap = {
  duration: 'min',
  distance: 'km',
} as const;

export function getUnit(metric: keyof typeof unitMap) {
  if (!(metric in unitMap)) {
    return '';
  }
  return unitMap[metric];
}

export function getTimeOfDay(isoString: string): 'Morning' | 'Afternoon' | 'Evening' {
  const date = new Date(isoString);

  const hour = date.getHours(); // ローカルタイムで取得

  if (hour >= 5 && hour < 12) {
    return 'Morning';
  }

  if (hour >= 12 && hour < 17) {
    return 'Afternoon';
  }

  return 'Evening';
}
