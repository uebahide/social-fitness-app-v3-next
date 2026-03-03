import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function Home() {
  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Home</button>
        </TooltipTrigger>
        <TooltipContent side="top">Home</TooltipContent>
      </Tooltip>
    </div>
  );
}
