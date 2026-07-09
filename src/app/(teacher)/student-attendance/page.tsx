"use client"

import StudentAttendanceHeader from "@/features/attendance/components/StudentAttendanceHeader"
import StudentAttendanceSummary from "@/features/attendance/components/StudentAttendanceSummary"
import StudentAttendanceTable from "@/features/attendance/components/StudentAttendanceTable"
import { useClassAttendances, useSaveAttendance, useTeacherClasses } from "@/features/attendance/query"
import { StudentAttendanceStatus } from "@/features/attendance/type"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { useSession } from "@/shared/hooks/useSession"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"

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
    if (classes.length > 0 && !activeClassId) {
      setActiveClassId(classes[0].id)
    }
  }, [classes, activeClassId])

  const students = attendances.map((att) => ({
    id: att.studentId,
    name: att.studentName,
    phone: att.studentPhone || "010-0000-0000",
    status: att.status as StudentAttendanceStatus,
    attendanceId: att.attendanceId,
  }))

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
  }

  const presentCount = students.filter(s => s.status === "ATTENDED").length;
  const lateCount = students.filter(s => s.status === "TARDY").length;
  const absentCount = students.filter(s => s.status === "ABSENT").length;

  return (
    <div className="flex flex-col p-8 h-full min-h-screen">
      <div className="flex flex-col gap-6">
        <Tabs value={activeClassId} onValueChange={setActiveClassId} className="w-full border-b pb-2">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent justify-start border-b border-gray-100 ">
            {isClassesLoading ? (
              <div className="text-muted-foreground text-sm px-2">강좌 목록을 불러오는 중...</div>
            ) : classes.length > 0 ? (
              classes.map((cls) => (
                <TabsTrigger 
                  key={cls.id} 
                  value={cls.id}
                  className="px-5 py-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white data-[state=active]:shadow-md text-muted-foreground bg-gray-50 border hover:bg-gray-200 transition-all"
                >
                  {cls.name}
                </TabsTrigger>
              ))
            ) : (
              <div className="text-muted-foreground text-sm px-2">등록된 강좌가 없습니다.</div>
            )}
          </TabsList>
        </Tabs>

        <div className="flex justify-between items-start">
          <StudentAttendanceHeader 
            classNameStr={activeClass?.name || "강좌 선택"}
            totalStudents={students.length}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
          <StudentAttendanceSummary 
            present={presentCount} 
            late={lateCount} 
            absent={absentCount} 
          />
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
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  )
}