import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "@/services/manager/student.service";
import { useStudentStore } from "@/store/manager/student.store";

export const studentQueryKeys = {
  all:  ()                                              => ["students"]                              as const,
  list: (tab: string, search: string, page: number)     => ["students", "list", tab, search, page]    as const,
};

export function useStudents() {
  const { tab, searchQuery, page } = useStudentStore();

  return useQuery({
    queryKey: studentQueryKeys.list(tab, searchQuery, page),
    queryFn:  () => fetchStudents(tab, searchQuery, page),
    placeholderData: (prev) => prev,
  });
}
