import type { ScheduleItem } from "@/types/teacher/schedule.types";

// TODO: import apiClient from "@/lib/axios";

const MOCK_SCHEDULE: ScheduleItem[] = [
  { id: 1, classId: 101, className: "중등 수학 A", dayOfWeek: 1, startTime: "14:00", endTime: "15:30" },
  { id: 2, classId: 101, className: "중등 수학 A", dayOfWeek: 3, startTime: "14:00", endTime: "15:30" },
  { id: 3, classId: 102, className: "중등 수학 B", dayOfWeek: 2, startTime: "16:00", endTime: "17:30" },
  { id: 4, classId: 102, className: "중등 수학 B", dayOfWeek: 4, startTime: "16:00", endTime: "17:30" },
  { id: 5, classId: 201, className: "초등 영어 A", dayOfWeek: 1, startTime: "10:00", endTime: "11:00" },
  { id: 6, classId: 201, className: "초등 영어 A", dayOfWeek: 5, startTime: "10:00", endTime: "11:00" },
  { id: 7, classId: 301, className: "고등 국어 특강", dayOfWeek: 6, startTime: "13:00", endTime: "15:00" },
];

export async function fetchWeeklySchedule(): Promise<ScheduleItem[]> {
  // TODO: return apiClient.get<{ body: ScheduleItem[] }>("/teacher/schedule/weekly").then((r) => r.data.body);

  await new Promise((res) => setTimeout(res, 300));
  return MOCK_SCHEDULE;
}