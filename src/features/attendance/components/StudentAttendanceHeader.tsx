"use client"

import * as React from "react"
import { Users, Calendar as CalendarIcon } from "lucide-react"
import { format, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"
import { Calendar } from "@/shared/components/ui/calendar"

interface StudentAttendanceHeaderProps {
  classNameStr: string;
  totalStudents: number;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function StudentAttendanceHeader({
  classNameStr,
  totalStudents,
  selectedDate,
  onDateChange
}: StudentAttendanceHeaderProps) {
  const dateObj = selectedDate ? parseISO(selectedDate) : new Date();

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const formatted = format(date, "yyyy-MM-dd");
      onDateChange(formatted);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-900">{classNameStr}</h2>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
        <div className="relative">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal bg-white",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(dateObj, "yyyy년 MM월 dd일 (EEE)", { locale: ko })
                ) : (
                  <span>날짜 선택</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                mode="single"
                selected={dateObj}
                onSelect={handleSelect}
                locale={ko}
                disabled={(date) => date > new Date()} 
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center gap-1.5 bg-white border px-3 py-2 rounded-md shadow-sm">
          <Users className="w-4 h-4 text-slate-500" />
          <span className="text-slate-700">총 <strong className="text-slate-900">{totalStudents}</strong>명</span>
        </div>
      </div>
    </div>
  )
}