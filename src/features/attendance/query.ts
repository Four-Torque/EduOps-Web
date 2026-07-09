import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchClassAttendances, 
  createStudentAttendance, 
  updateStudentAttendance,
} from "./api";
import { ClassStudentAttendance } from "./type";
import { fetchTeacherClasses } from "../class/api";

// 수업 목록 조회 훅
export function useTeacherClasses(teacherId: string) {
  return useQuery({
    queryKey: ["teacher", teacherId, "classes"],
    queryFn: () => fetchTeacherClasses(teacherId),
    enabled: !!teacherId, // teacherId가 있을 때만 요청
  });
}

// 특정 수업 및 날짜의 출결 리스트 조회 훅
export function useClassAttendances(classId: string, lectureDate: string) {
  return useQuery({
    queryKey: ["class", classId, "attendance", lectureDate],
    queryFn: () => fetchClassAttendances(classId, lectureDate),
    enabled: !!classId && !!lectureDate,
  });
}

// 출결 상태 단건 저장/수정 훅 (낙관적 업데이트 적용)
export function useSaveAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      attendanceId: string | null;
      studentId: string;
      classId: string;
      lectureDate: string;
      status: string;
    }) => {
      if (data.attendanceId) {
        return updateStudentAttendance(data.attendanceId, data.status);
      } else {
        return createStudentAttendance({
          studentId: data.studentId,
          classId: data.classId,
          lectureDate: data.lectureDate,
          status: data.status,
        });
      }
    },
    // API 호출 전에 UI 상태를 즉시 업데이트
    onMutate: async (newAttendance) => {
      const queryKey = ["class", newAttendance.classId, "attendance", newAttendance.lectureDate];
      
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey });

      // 이전 상태 백업
      const previousAttendances = queryClient.getQueryData<ClassStudentAttendance[]>(queryKey);

      // 새 값으로 캐시 업데이트
      if (previousAttendances) {
        queryClient.setQueryData(queryKey, (old: ClassStudentAttendance[] | undefined) => {
          if (!old) return old;
          return old.map((student) =>
            student.studentId === newAttendance.studentId
              ? { ...student, status: newAttendance.status as ClassStudentAttendance["status"] }
              : student
          );
        });
      }

      return { previousAttendances, queryKey };
    },
    // 실패 시 이전 상태로 롤백
    onError: (err, newAttendance, context) => {
      if (context?.previousAttendances) {
        queryClient.setQueryData(context.queryKey, context.previousAttendances);
      }
    },
    // 완료 시 최신 데이터 다시 불러오기
    onSettled: (data, error, variables, context) => {
      if (context?.queryKey) {
        queryClient.invalidateQueries({ queryKey: context.queryKey });
      }
    },
  });
}