"use client"

import { useState, useEffect } from "react"
import StudentAttendanceHeader from "@/components/teacher/student-attendance/StudentAttendanceHeader"
import AttendanceSummary from "@/components/teacher/student-attendance/AttendanceSummary"
import AttendanceTable from "@/components/teacher/student-attendance/AttendanceTable"
import { toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { useTeacherClasses, useClassAttendances, useSaveAttendance } from "@/hooks/teacher/attendance.hooks"
import { useSession } from "@/hooks/user/useSession"
import { AttendanceStatus } from "@/types/teacher/attendance.type"

export default function StudentAttendancePage() {
  const [activeClassId, setActiveClassId] = useState("")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const { data: user } = useSession();
  const teacherId = user?.id || "";

  const { data: paginatedClasses, isLoading: isClassesLoading } = useTeacherClasses(teacherId)
  const classes = paginatedClasses?.data || []

  const { data: attendancesData, isLoading: isAttendancesLoading } = useClassAttendances(activeClassId, selectedDate)
  const attendances = attendancesData || []

  const activeClass = classes.find((c) => c.id === activeClassId)

  const { mutate: saveAttendance } = useSaveAttendance()

  useEffect(() => {
    if (!isClassesLoading) {
      console.log("🔥 [API 호출 결과] 강좌 목록:", classes);
    }
  }, [classes, isClassesLoading]);

  useEffect(() => {
    if (classes.length > 0 && !activeClassId) {
      setActiveClassId(classes[0].id)
    }
  }, [classes, activeClassId])


  useEffect(() => {
    if (!isAttendancesLoading && activeClassId) {
      console.log(`🔥 [API 호출 결과] ${selectedDate} 출결 리스트:`, attendances);
    }
  }, [attendances, isAttendancesLoading, activeClassId, selectedDate]);

  const students = attendances.map((att) => ({
    id: att.studentId,
    name: att.studentName,
    phone: att.studentPhone || "010-0000-0000",
    status: att.status as AttendanceStatus,
    attendanceId: att.attendanceId,
  }))

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
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

    console.log("🚀 [API 호출 시도] 출결 단건 저장/수정:", payload);

    saveAttendance(payload);
    
    // 즉각적인 피드백 (단건 수정이므로 매번 토스트를 띄우면 너무 많을 수 있으니 생략하거나 가볍게 처리 가능합니다)
    toast.success("출결 상태가 변경되었습니다.", { duration: 1000 });
  }

  const presentCount = students.filter(s => s.status === "ATTENDED").length;
  const lateCount = students.filter(s => s.status === "TARDY").length;
  const absentCount = students.filter(s => s.status === "ABSENT").length;

  return (
    <div className="flex flex-col p-8 bg-white h-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6">학생 출결 관리</h1>

      <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
        {isClassesLoading ? (
          <div className="text-muted-foreground text-sm">강좌 목록을 불러오는 중...</div>
        ) : classes.length > 0 ? (
          classes.map((cls) => (
            <Button 
              key={cls.id} 
              variant={activeClassId === cls.id ? "default" : "ghost"}
              onClick={() => setActiveClassId(cls.id)}
              className={`rounded-full px-5 ${activeClassId === cls.id ? "bg-slate-900 text-white" : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"}`}
            >
              {cls.name}
            </Button>
          ))
        ) : (
          <div className="text-muted-foreground text-sm">등록된 강좌가 없습니다.</div>
        )}
      </div>

      <div className="flex justify-between items-start mb-2">
        <StudentAttendanceHeader 
          classNameStr={activeClass?.name || "강좌 선택"}
          totalStudents={students.length}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <AttendanceSummary 
          present={presentCount} 
          late={lateCount} 
          absent={absentCount} 
        />
      </div>
      
      {isAttendancesLoading ? (
        <div className="mt-10 text-center text-muted-foreground">출결 데이터를 불러오는 중...</div>
      ) : (
        <AttendanceTable 
          students={students} 
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  )
}