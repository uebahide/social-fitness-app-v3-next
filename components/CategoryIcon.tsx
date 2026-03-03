import RunIcon from './icons/Run';
import CycleIcon from './icons/Cycle';
import SwimIcon from './icons/Swim';
import WalkIcon from './icons/Walk';
import BarbellIcon from './icons/Barbell';
import { YogaIcon } from './icons/Yoga';
import { TrekkingIcon } from './icons/Trekking';

export const CategoryIcon = ({ category }: { category: string }) => {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      {category === 'running' && <RunIcon />}
      {category === 'cycling' && <CycleIcon />}
      {category === 'swimming' && <SwimIcon />}
      {category === 'walking' && <WalkIcon />}
      {category === 'gym' && <BarbellIcon />}
      {category === 'yoga' && <YogaIcon />}
      {category === 'hiking' && <TrekkingIcon />}
    </div>
  );
};
