"use client";

import { useState } from "react";
import { CardModal } from "@/shared/components/CardModal";
import { ClassInfo } from "@/features/class/type";
import { useUpdateClass } from "@/features/class/query";
import { useTeachers } from "@/features/user/query";
import { useStudents } from "@/features/student/query";
import {
  useCreateScheduleBulk,
  useDeleteSchedule,
} from "@/features/schedule/query";
import {
  useCreateEnrollment,
  useClassEnrollments,
  useDeleteEnrollment,
} from "@/features/enrollment/query";
import { toast } from "react-hot-toast";
import { useFindSubjects } from "@/features/subject/query";
import { ClassInfoTab } from "./ClassInfoTab";
import { ClassScheduleTab } from "./ClassScheduleTab";
import { ClassStudentTab } from "./ClassStudentTab";
import { StudentTabFilter } from "@/features/student/type";

interface ClassDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ClassInfo;
}

export function ClassDetailModal({
  isOpen,
  onClose,
  item,
}: ClassDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"info" | "schedule" | "student">(
    "info",
  );

  const [infoForm, setInfoForm] = useState({
    name: item.name,
    fee: item.fee?.toString() || "",
    capacity: item.capacity?.toString() || "",
    startDate: item.startDate ? item.startDate.split("T")[0] : "",
    endDate: item.endDate ? item.endDate.split("T")[0] : "",
    teacherId: item.teacherId || "",
    subjectName: item.subjectName || "",
  });

  const handleInfoChange = (field: keyof typeof infoForm, value: string) => {
    setInfoForm((prev) => ({ ...prev, [field]: value }));
  };

  const { data: subjects = [] } = useFindSubjects();
  const { data: teachers = [] } = useTeachers();
  const updateClassMutation = useUpdateClass();

  const handleUpdate = () => {
    updateClassMutation.mutate({
      id: item.id,
      payload: {
        name: infoForm.name,
        fee: parseInt(infoForm.fee, 10),
        capacity: parseInt(infoForm.capacity, 10),
        subjectName: infoForm.subjectName,
        startDate: new Date(infoForm.startDate).toISOString(),
        endDate: new Date(infoForm.endDate).toISOString(),
        teacherId: infoForm.teacherId,
      },
    });
  };

  const [scheduleForm, setScheduleForm] = useState({
    dayOfWeek: "0",
    startTime: "14:00",
    endTime: "15:30",
    room: "101호",
  });

  const handleScheduleChange = (
    field: keyof typeof scheduleForm,
    value: string,
  ) => {
    setScheduleForm((prev) => ({ ...prev, [field]: value }));
  };

  const createScheduleMutation = useCreateScheduleBulk();
  const deleteScheduleMutation = useDeleteSchedule();

  const handleAddSchedule = () => {
    createScheduleMutation.mutate(
      {
        classId: item.id,
        schedules: [
          {
            dayOfWeek: parseInt(scheduleForm.dayOfWeek, 10),
            startTime: scheduleForm.startTime,
            endTime: scheduleForm.endTime,
            room: scheduleForm.room,
          },
        ],
      },
      {
        onSuccess: () => {
          toast.success("스케줄이 추가되었습니다.");
        },
        onError: (e) => {
          toast.error(e.message || "스케줄 추가에 실패했습니다.");
        },
      },
    );
  };

  const handleDeleteSchedule = (id: string) => {
    if (window.confirm("정말 이 스케줄을 삭제하시겠습니까?")) {
      deleteScheduleMutation.mutate(id, {
        onSuccess: () => toast.success("스케줄이 삭제되었습니다."),
        onError: (e) => toast.error(e.message || "스케줄 삭제에 실패했습니다."),
      });
    }
  };

  const { data: enrollmentsResponse } = useClassEnrollments(item.id);
  const enrollments = Array.isArray(enrollmentsResponse)
    ? enrollmentsResponse
    : enrollmentsResponse || [];

  const { data: studentsResponse } = useStudents({
    page: "1",
    limit: "100",
    tab: "학생" as StudentTabFilter,
    search: "",
  });
  const students = studentsResponse?.data || [];

  const [studentForm, setStudentForm] = useState({
    selectedStudentId: "",
  });

  const handleStudentChange = (
    field: keyof typeof studentForm,
    value: string,
  ) => {
    setStudentForm((prev) => ({ ...prev, [field]: value }));
  };

  const createEnrollmentMutation = useCreateEnrollment();
  const deleteEnrollmentMutation = useDeleteEnrollment();

  const handleAddStudent = () => {
    if (!studentForm.selectedStudentId) return;
    createEnrollmentMutation.mutate(
      {
        classId: item.id,
        studentId: studentForm.selectedStudentId,
        enrollDate: new Date(),
      },
      {
        onSuccess: () => {
          toast.success("학생이 등록되었습니다.");
          handleStudentChange("selectedStudentId", "");
        },
        onError: (e) => {
          toast.error(e.message || "에러");
        },
      },
    );
  };

  const handleDeleteEnrollment = (id: string) => {
    if (window.confirm("정말 이 학생을 수강 취소하시겠습니까?")) {
      deleteEnrollmentMutation.mutate(id, {
        onSuccess: () => toast.success("수강이 취소되었습니다."),
        onError: (e) => toast.error(e.message || "에러"),
      });
    }
  };

  return (
    <CardModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="강좌 상세보기"
      description="강좌 정보를 수정하거나 스케줄 및 학생을 관리할 수 있습니다."
      size="lg"
    >
      <div className="flex border-b border-slate-200 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "info" ? "border-slate-800 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("info")}
        >
          기본 정보
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "schedule" ? "border-slate-800 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("schedule")}
        >
          스케줄 관리
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "student" ? "border-slate-800 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          onClick={() => setActiveTab("student")}
        >
          수강생 관리
        </button>
      </div>

      <div className="min-h-[300px]">
        {activeTab === "info" && (
          <ClassInfoTab
            formData={infoForm}
            onChange={handleInfoChange}
            teachers={teachers}
            subjects={subjects}
            handleUpdate={handleUpdate}
            isUpdating={updateClassMutation.isPending}
          />
        )}

        {activeTab === "schedule" && (
          <ClassScheduleTab
            schedules={item.schedules}
            formData={scheduleForm}
            onChange={handleScheduleChange}
            handleAddSchedule={handleAddSchedule}
            handleDeleteSchedule={handleDeleteSchedule}
            isAddingSchedule={createScheduleMutation.isPending}
          />
        )}

        {activeTab === "student" && (
          <ClassStudentTab
            enrollments={enrollments}
            capacity={item.capacity || 0}
            students={students}
            formData={studentForm}
            onChange={handleStudentChange}
            handleAddStudent={handleAddStudent}
            handleDeleteEnrollment={handleDeleteEnrollment}
            isAddingStudent={createEnrollmentMutation.isPending}
          />
        )}
      </div>
    </CardModal>
  );
}
