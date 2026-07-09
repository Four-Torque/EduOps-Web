import { ScheduleHeader } from "@/features/schedule/components/ScheduleHeader";
import { ScheduleFilterBar } from "@/features/schedule/components/ScheduleFilterBar";
import { ScheduleCalendar } from "@/features/schedule/components/ScheduleCalendar2";

export default function SchedulePage() {
  return (
    <div>
      <ScheduleHeader />
      <ScheduleFilterBar />
      <ScheduleCalendar />
    </div>
  );
}
