import { ScheduleHeader } from "@/components/manager/academic/schedule/ScheduleHeader";
import { ScheduleFilterBar } from "@/components/manager/academic/schedule/ScheduleFilterBar";
import { ScheduleCalendar } from "@/components/manager/academic/schedule/ScheduleCalendar";

export default function SchedulePage() {
  return (
    <div className="p-6">
      <ScheduleHeader />
      <ScheduleFilterBar />
      <ScheduleCalendar />
    </div>
  );
}