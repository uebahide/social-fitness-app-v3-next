import RunIcon from './icons/Run';
import CycleIcon from './icons/Cycle';
import SwimIcon from './icons/Swim';
import WalkIcon from './icons/Walk';
import BarbellIcon from './icons/Barbell';
import { YogaIcon } from './icons/Yoga';
import { TrekkingIcon } from './icons/Trekking';
import { BoxingIcon } from './icons/Boxing';
import { Category } from '@/types/api/category';
import { cn } from '@/lib/utils';

export const CategoryIcon = ({ category, className }: { category: string; className?: string }) => {
  return (
    <div className={cn('flex h-10 w-10 items-center justify-center', className)}>
      {category === 'running' && <RunIcon className="text-amber-600" />}
      {category === 'cycling' && <CycleIcon className="text-green-600" />}
      {category === 'swimming' && <SwimIcon className="text-blue-600" />}
      {category === 'walking' && <WalkIcon className="text-black" />}
      {category === 'gym' && <BarbellIcon className="text-purple-600" />}
      {category === 'yoga' && <YogaIcon className="text-pink-600" />}
      {category === 'hiking' && <TrekkingIcon className="text-cyan-600" />}
      {category === 'boxing' && <BoxingIcon />}
    </div>
  );
};
