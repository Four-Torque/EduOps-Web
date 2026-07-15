"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import StudentAttendanceClassTabs from "@/features/attendance/components/StudentAttendanceClassTabs";
import StudentAttendanceHeader from "@/features/attendance/components/StudentAttendanceHeader";
import StudentAttendanceSummary from "@/features/attendance/components/StudentAttendanceSummary";
import StudentAttendanceTable from "@/features/attendance/components/StudentAttendanceTable";
import { useClassAttendances, useSaveAttendance, useTeacherClasses } from "@/features/attendance/query";
import { StudentAttendanceStatus } from "@/features/attendance/type";
import type { ClassInfo } from "@/features/class/type";
import { useSession } from "@/shared/hooks/useSession";

// 선택한 날짜의 요일에 해당하는 강좌 스케줄 시간을 찾는다.
// dayOfWeek는 일(0)~토(6) 기준 (ScheduleForm.tsx의 DAY_OF_WEEK_OPTIONS와 동일, JS Date.getDay()와 그대로 일치).
function getScheduleTimeLabel(activeClass: ClassInfo | undefined, selectedDate: string): string {
  if (!activeClass) return "-";
  const dayOfWeek = new Date(`${selectedDate}T00:00:00`).getDay();
  const schedule = activeClass.schedules.find((s) => s.dayOfWeek === dayOfWeek);

  return schedule ? `${schedule.startTime} - ${schedule.endTime}` : "-";
}

export default function StudentAttendancePage() {
  const [activeClassId, setActiveClassId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const { data: user } = useSession();
  const teacherId = user?.id || "";

  const { data: paginatedClasses, isLoading: isClassesLoading } = useTeacherClasses(teacherId);
  const classes = paginatedClasses?.data || [];

  const { data: attendancesData, isLoading: isAttendancesLoading } = useClassAttendances(activeClassId, selectedDate);
  const attendances = attendancesData || [];

  const activeClass = classes.find((c) => c.id === activeClassId);


  
  const scheduleTimeLabel = getScheduleTimeLabel(activeClass, selectedDate);



  const { mutate: saveAttendance } = useSaveAttendance();

  useEffect(() => {
    if (classes.length > 0 && !activeClassId) {
      setActiveClassId(classes[0].id);
    }
  }, [classes, activeClassId]);

  const students = attendances.map((att) => ({
    id: att.studentId,
    name: att.studentName,
    phone: att.studentPhone || "010-0000-0000",
    status: att.status as StudentAttendanceStatus,
    attendanceId: att.attendanceId,
  }));

  const handleStatusChange = (studentId: string, status: StudentAttendanceStatus) => {
    if (!status || !activeClassId) return;
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const payload = {
      attendanceId: student.attendanceId,
      studentId: student.id,
      classId: activeClassId,
      lectureDate: selectedDate,
      status: status,
    };

    saveAttendance(payload);
    toast.success("출결 상태가 변경되었습니다.", { duration: 1000 });
  };

  const presentCount = students.filter((s) => s.status === "ATTENDED").length;
  const lateCount = students.filter((s) => s.status === "TARDY").length;
  const absentCount = students.filter((s) => s.status === "ABSENT").length;

  return (
    <div className="flex flex-col h-full min-h-screen">
      <div className="flex flex-col gap-4">
        <StudentAttendanceClassTabs
          classes={classes}
          activeClassId={activeClassId}
          isLoading={isClassesLoading}
          onChange={setActiveClassId}
        />

        <div className="flex justify-between items-start">
          <StudentAttendanceHeader
            classNameStr={activeClass?.name || "강좌 선택"}
            totalStudents={students.length}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <StudentAttendanceSummary present={presentCount} late={lateCount} absent={absentCount} />
        </div>

        {isAttendancesLoading ? (
          <div className="mt-10 flex justify-center items-center h-40">
            <div className="text-muted-foreground flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin"></div>
              출결 데이터를 불러오는 중...
            </div>
          </div>
        ) : (
          <StudentAttendanceTable
            students={students}
            scheduleTime={scheduleTimeLabel}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}