import apiClient from "@/shared/lib/axios";

export interface ScheduleItem {
  id: string;
  classId: string;
  className: string;
  instructor: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room: string;
}

export async function fetchWeeklySchedule(
  room?: string,
  instructor?: string,
  subject?: string,
): Promise<ScheduleItem[]> {
  const response = await apiClient.get("/schedule", {
    params: {
      room: room && room !== "all" ? room : undefined,
      teacherName: instructor && instructor !== "all" ? instructor : undefined,
      subject: subject && subject !== "all" ? subject : undefined,
    },
  });
  return response.data.body ?? response.data;
}

export async function createScheduleBulk(data: {
  classId: string;
  schedules: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    room: string;
  }>;
}): Promise<void> {
  await apiClient.post("/schedule", data);
}

export async function deleteSchedule(id: string): Promise<void> {
  await apiClient.delete(`/schedule/${id}`);
}
