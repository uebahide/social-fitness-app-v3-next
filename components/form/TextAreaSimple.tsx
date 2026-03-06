import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function TextareaSimple({
  placeholder,
  className,
  id,
  name,
}: {
  placeholder: string;
  className: string;
  id: string;
  name: string;
}) {
  return <Textarea placeholder={placeholder} id={id} name={name} />;
}
