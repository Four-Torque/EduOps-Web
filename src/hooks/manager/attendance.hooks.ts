import { useQuery } from "@tanstack/react-query";
import { fetchAttendance } from "@/services/manager/attendance.service";
import { useAttendanceStore } from "@/store/manager/attendance.store";

export const attendanceQueryKeys = {
  all:  ()                => ["attendance"]              as const,
  list: (filter: object)  => ["attendance", "list", filter] as const,
};

export function useAttendance() {
  const { filter } = useAttendanceStore();

  return useQuery({
    queryKey: attendanceQueryKeys.list(filter),
    queryFn:  () => fetchAttendance(filter),
    placeholderData: (prev) => prev,
  });
}
