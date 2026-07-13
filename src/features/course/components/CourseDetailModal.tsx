"use client";

import { useState } from "react";
import { CardModal } from "@/shared/components/CardModal";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { ClassInfo } from "@/features/class/type";
import { useUpdateClass } from "@/features/class/query";
import { useTeachers } from "@/features/user/query";
import { useStudents } from "@/features/student/query";
import { useCreateScheduleBulk, useDeleteSchedule } from "@/features/schedule/query";
import { useCreateEnrollment, useClassEnrollments, useDeleteEnrollment } from "@/features/enrollment/query";
import { toast } from "react-hot-toast";
import { Plus, Trash2, Calendar, User, Clock, MapPin, Phone } from "lucide-react";

interface CourseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ClassInfo;
}

export function CourseDetailModal({ isOpen, onClose, item }: CourseDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"info" | "schedule" | "student">("info");

  const [name, setName] = useState(item.name);
  const [fee, setFee] = useState(item.fee?.toString() || "");
  const [capacity, setCapacity] = useState(item.capacity?.toString() || "");
  const [startDate, setStartDate] = useState(item.startDate ? item.startDate.split("T")[0] : "");
  const [endDate, setEndDate] = useState(item.endDate ? item.endDate.split("T")[0] : "");
  const [teacherId, setTeacherId] = useState(item.teacherId || "");

  const { data: teachers = [] } = useTeachers();
  const updateClassMutation = useUpdateClass();

  const handleUpdate = () => {
    updateClassMutation.mutate(
      {
        id: item.id,
        payload: {
          name,
          fee: parseInt(fee, 10),
          capacity: parseInt(capacity, 10),
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          teacherId,
        },
      },
      {
        onSuccess: () => {
          toast.success("강좌 정보가 수정되었습니다.");
        },
        onError: (error: any) => {
          toast.error(error.message || "강좌 정보 수정에 실패했습니다.");
        },
      }
    );
  };

  const [dayOfWeek, setDayOfWeek] = useState("0");
  const [startTime, setStartTime] = useState("14:00");
  const [endTime, setEndTime] = useState("15:30");
  const [room, setRoom] = useState("101호");
  
  const createScheduleMutation = useCreateScheduleBulk();
  const deleteScheduleMutation = useDeleteSchedule();
  const handleAddSchedule = () => {
    createScheduleMutation.mutate(
      {
        classId: item.id,
        schedules: [
          {
            dayOfWeek: parseInt(dayOfWeek, 10),
            startTime,
            endTime,
            room,
          }
        ]
      },
      {
        onSuccess: () => {
          toast.success("스케줄이 추가되었습니다.");
        },
        onError: (error: any) => {
          toast.error(error.message || "스케줄 추가에 실패했습니다.");
        },
      }
    );
  };

  const handleDeleteSchedule = (id: string) => {
    if (window.confirm("정말 이 스케줄을 삭제하시겠습니까?")) {
      deleteScheduleMutation.mutate(id, {
        onSuccess: () => toast.success("스케줄이 삭제되었습니다."),
        onError: (error: any) => toast.error(error.message || "스케줄 삭제에 실패했습니다.")
      });
    }
  };

  const { data: enrollmentsResponse } = useClassEnrollments(item.id);
  const enrollments = Array.isArray(enrollmentsResponse) ? enrollmentsResponse : (enrollmentsResponse || []);
  
  const { data: studentsResponse } = useStudents({ 
    page: "1", 
    limit: "100", 
    tab: "학생" as any, 
    search: "" 
  });
  const students = studentsResponse?.data || [];
  
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const createEnrollmentMutation = useCreateEnrollment();
  const deleteEnrollmentMutation = useDeleteEnrollment();

  const handleAddStudent = () => {
    if (!selectedStudentId) return;
    createEnrollmentMutation.mutate(
      {
        classId: item.id,
        studentId: selectedStudentId,
        enrollDate: new Date(),
      },
      {
        onSuccess: () => {
          toast.success("학생이 등록되었습니다.");
          setSelectedStudentId("");
        },
        onError: (error: any) => {
          toast.error(error.message || "에러");
        },
      }
    );
  };

  const handleDeleteEnrollment = (id: string) => {
    if (window.confirm("정말 이 학생을 수강 취소하시겠습니까?")) {
      deleteEnrollmentMutation.mutate(id, {
        onSuccess: () => toast.success("수강이 취소되었습니다."),
        onError: (error: any) => toast.error(error.message || "에러")
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
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="courseName">강좌명</Label>
              <Input id="courseName" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="teacher">담당 강사</Label>
              <select
                id="teacher"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
              >
                <option value="" disabled>강사를 선택하세요</option>
                {teachers.map((t: any) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>수강료 (원)</Label>
                <Input type="number" value={fee} onChange={(e) => setFee(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>정원 (명)</Label>
                <Input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>시작일</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>종료일</Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button onClick={handleUpdate} disabled={updateClassMutation.isPending}>
                {updateClassMutation.isPending ? "수정 중..." : "수정하기"}
              </Button>
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="flex flex-col gap-5">
            <div className="bg-slate-50/50 p-5 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-[15px] text-slate-800 mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-blue-500" />
                현재 스케줄
              </h4>
              {item.schedules?.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.schedules.map((s) => (
                    <li key={s.id} className="group flex flex-col justify-center text-sm bg-white p-3.5 rounded-md border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-200 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1.5 pl-2">
                          <span className="font-semibold text-slate-700">
                            {["월", "화", "수", "목", "금", "토", "일"][s.dayOfWeek]}요일
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                            <Clock size={12} /> {s.startTime} - {s.endTime}
                          </span>
                          <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                            <MapPin size={12} /> {s.room}
                          </span>
                        </div>
                        <button 
                          onClick={() => handleDeleteSchedule(s.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          title="스케줄 삭제"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 bg-white rounded-md border border-dashed border-slate-200">
                  <Calendar size={24} className="text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">등록된 스케줄이 없습니다.</p>
                </div>
              )}
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-[15px] text-slate-800 mb-4 flex items-center gap-2">
                <Plus size={16} className="text-emerald-500" />
                새 스케줄 추가
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-slate-600 font-medium">요일</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:ring-emerald-500 focus-visible:border-emerald-500" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)}>
                    <option value="0">월요일</option>
                    <option value="1">화요일</option>
                    <option value="2">수요일</option>
                    <option value="3">목요일</option>
                    <option value="4">금요일</option>
                    <option value="5">토요일</option>
                    <option value="6">일요일</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-slate-600 font-medium">시작 시간</Label>
                  <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="h-10 focus-visible:ring-emerald-500 focus-visible:border-emerald-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-slate-600 font-medium">종료 시간</Label>
                  <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="h-10 focus-visible:ring-emerald-500 focus-visible:border-emerald-500" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs text-slate-600 font-medium">강의실</Label>
                  <Input value={room} onChange={e => setRoom(e.target.value)} className="h-10 focus-visible:ring-emerald-500 focus-visible:border-emerald-500" placeholder="예: 101호" />
                </div>
              </div>
              <Button onClick={handleAddSchedule} disabled={createScheduleMutation.isPending} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
                <Plus size={16} className="mr-1.5" /> 스케줄 추가하기
              </Button>
            </div>
          </div>
        )}

        {activeTab === "student" && (
          <div className="flex flex-col gap-5">
            <div className="bg-slate-50/50 p-5 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-[15px] text-slate-800 flex items-center gap-2">
                  <User size={16} className="text-purple-500" />
                  수강생 목록 
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">{enrollments.length} / {item.capacity}</span>
                </h4>
              </div>
              
              {enrollments.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                  {enrollments.map((e: any) => (
                    <li key={e.id} className="group flex items-center justify-between bg-white p-3 rounded-md border border-slate-200 shadow-sm hover:border-purple-200 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-3">
                        
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800">{e.studentName || "이름없음"}</span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Phone size={10} /> {e.studentPhone || "전화번호 없음"}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteEnrollment(e.id)}
                        className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                        title="수강 취소"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 bg-white rounded-md border border-dashed border-slate-200">
                  <User size={24} className="text-slate-300 mb-2" />
                  <p className="text-sm text-slate-500">현재 등록된 수강생이 없습니다.</p>
                </div>
              )}
            </div>

            <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
              <h4 className="font-bold text-[15px] text-slate-800 mb-4 flex items-center gap-2">
                <Plus size={16} className="text-purple-500" />
                새 수강생 등록
              </h4>
              <div className="flex gap-3 items-end">
                <div className="flex flex-col gap-1.5 flex-1">
                  <Label className="text-xs text-slate-600 font-medium">원생 선택</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-purple-500 focus-visible:border-purple-500"
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                  >
                    <option value="">등록할 원생을 선택하세요</option>
                    {students.map((st: any) => (
                      <option key={st.id} value={st.id}>{st.name} ({st.phone})</option>
                    ))}
                  </select>
                </div>
                <Button onClick={handleAddStudent} disabled={!selectedStudentId || createEnrollmentMutation.isPending}>
                  <Plus size={16} className="mr-1" /> 등록
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CardModal>
  );
}
