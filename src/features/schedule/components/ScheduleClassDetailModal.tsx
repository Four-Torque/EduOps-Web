"use client";

import { CardModal } from "@/shared/components/CardModal";
import { useClass } from "@/features/class/query";
import { useClassEnrollments } from "@/features/enrollment/query";
import { Calendar, Clock, MapPin, User, Phone } from "lucide-react";
import { DAY_LABELS } from "@/shared/constants/day.constants";
import { formatWon } from "@/shared/lib/utils";

interface ScheduleClassDetailModalProps {
  open: boolean;
  onClose: () => void;
  classId: string | null;
}

function formatDate(date: string | null) {
  return date ? date.split("T")[0] : "-";
}

export function ScheduleClassDetailModal({
  open,
  onClose,
  classId,
}: ScheduleClassDetailModalProps) {
  const { data: classInfo, isLoading, error } = useClass(classId);
  const { data: enrollments = [] } = useClassEnrollments(classId ?? "");

  return (
    <CardModal
      open={open}
      onOpenChange={(next) => !next && onClose()}
      title="강좌 상세보기"
      size="lg"
      bodyClassName="bg-slate-50"
    >
      {isLoading && (
        <p className="text-sm text-slate-400">불러오는 중...</p>
      )}

      {!isLoading && (error || !classInfo) && (
        <p className="text-sm text-red-500">강좌 정보를 찾을 수 없습니다.</p>
      )}

      {!isLoading && classInfo && (
        <div className="space-y-5">
          {/* 기본 정보 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h1 className="text-xl font-bold text-slate-800">{classInfo.name}</h1>
            <dl className="mt-4 space-y-3 text-[13px]">
              <div>
                <dt className="text-slate-400">담당 강사</dt>
                <dd className="mt-1 text-slate-700">{classInfo.teacherName}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-slate-400">수강료</dt>
                  <dd className="mt-1 text-slate-700">{formatWon(classInfo.fee)}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">정원</dt>
                  <dd className="mt-1 text-slate-700">
                    {classInfo.currentStudents} / {classInfo.capacity}명
                  </dd>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-slate-400">시작일</dt>
                  <dd className="mt-1 text-slate-700">{formatDate(classInfo.startDate)}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">종료일</dt>
                  <dd className="mt-1 text-slate-700">{formatDate(classInfo.endDate)}</dd>
                </div>
              </div>
            </dl>
          </div>

          {/* 현재 스케줄 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-slate-800">
              <Calendar size={14} className="text-blue-500" />
              현재 스케줄
            </h2>
            {classInfo.schedules?.length > 0 ? (
              <ul className="grid max-h-[300px] grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2">
                {classInfo.schedules.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-md border border-slate-200 p-3 text-[13px]"
                  >
                    <p className="font-semibold text-slate-700">
                      {DAY_LABELS[s.dayOfWeek]}요일
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={12} /> {s.startTime} - {s.endTime}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={12} /> {s.room}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13px] text-slate-400">등록된 스케줄이 없습니다.</p>
            )}
          </div>

          {/* 수강생 목록 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-[13px] font-semibold text-slate-800">
              <User size={14} className="text-purple-500" />
              수강생 목록 ({enrollments.length})
            </h2>
            {enrollments.length > 0 ? (
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {enrollments.map((e) => (
                  <li
                    key={e.id}
                    className="rounded-md border border-slate-200 p-3 text-[13px]"
                  >
                    <p className="font-semibold text-slate-700">
                      {e.studentName || "이름없음"}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <Phone size={12} /> {e.studentPhone || "전화번호 없음"}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13px] text-slate-400">등록된 수강생이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </CardModal>
  );
}
