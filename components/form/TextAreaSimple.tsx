import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function TextareaSimple({
  placeholder,
  className,
  id,
  name,
  defaultValue,
}: {
  placeholder: string;
  className: string;
  id: string;
  name: string;
  defaultValue: string;
}) {
  return <Textarea placeholder={placeholder} id={id} name={name} defaultValue={defaultValue} />;
}
