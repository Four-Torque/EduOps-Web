"use client";

import { format, parseISO, isValid } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useMemo, useState } from "react";

export interface DatePickerProps {
  value?: string | Date | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  startMonth?: Date;
  endMonth?: Date;
  captionLayout?: "label" | "dropdown";
}

export function DatePicker({
  value,
  onChange,
  placeholder = "날짜 선택",
  className,
  disabled = false,
  hasError = false,
  startMonth,
  endMonth,
  captionLayout = "dropdown",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const dateValue = useMemo(() => {
    if (!value) return undefined;
    if (value instanceof Date) return isValid(value) ? value : undefined;
    const parsed = parseISO(value);
    return isValid(parsed) ? parsed : undefined;
  }, [value]);

  function handleSelect(date: Date | undefined) {
    if (onChange) {
      onChange(date ? date.toISOString() : null);
    }
    setOpen(false);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal bg-white h-9 rounded-md border border-input px-3 text-sm shadow-xs",
            hasError &&
              "border-destructive ring-destructive/35 focus-visible:ring-destructive/35",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
          <span className="truncate">
            {dateValue
              ? format(dateValue, "yyyy년 MM월 dd일", { locale: ko })
              : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleSelect}
          locale={ko}
          captionLayout={captionLayout}
          startMonth={startMonth}
          endMonth={endMonth}
        />
      </PopoverContent>
    </Popover>
  );
}
