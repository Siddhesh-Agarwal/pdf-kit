import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateInputProps {
  id?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  invalid?: boolean;
  placeholder?: string;
  className?: string;
}

export function DateInput({
  id,
  value,
  onChange,
  invalid,
  placeholder = "Pick a date",
  className,
}: DateInputProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            invalid && "border-destructive",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={value} onSelect={onChange} autoFocus />
      </PopoverContent>
    </Popover>
  );
}
