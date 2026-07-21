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
  classStartDate: string | null;
  classEndDate: string | null;
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

export const createBulkSchedule = async (payload: { classId: string; schedules: { dayOfWeek: number; startTime: string; endTime: string; room: string }[] }) => {
  const response = await apiClient.post("/schedule", payload);
  return response.data;
};

export async function deleteSchedule(id: string): Promise<void> {
  await apiClient.delete(`/schedule/${id}`);
}

export const fetchClassSchedules = async (classId: string) => {
  const response = await apiClient.get("/schedule", { params: { classId } });
  return response.data.body ?? response.data;
};

