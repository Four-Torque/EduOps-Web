import { ClassInfo } from "@/features/class/type";
import { MoreVertical, User, Calendar, Building2, Users } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useDeleteClass } from "@/features/class/query";
import { CourseDetailModal } from "./CourseDetailModal";

interface CourseCardProps {
  item: ClassInfo;
}

export function CourseCard({ item }: CourseCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { mutate: deleteClass } = useDeleteClass();

  const isFull = item.currentStudents >= item.capacity;
  const progressRatio = item.capacity > 0 ? Math.min((item.currentStudents / item.capacity) * 100, 100) : 0;
  
  const daysMap = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col gap-4 shadow-sm hover:shadow transition-shadow">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-slate-900">{item.name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-slate-400 hover:text-slate-600 p-1 rounded hover:bg-slate-50 transition-colors">
                <MoreVertical size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsDetailOpen(true)}>상세보기</DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
                onClick={() => {
                  if (window.confirm("강좌를 삭제하시겠습니까?")) {
                    deleteClass(item.id);
                  }
                }}
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <User size={14} />
          </div>
          <span className="text-sm text-slate-700 font-medium">{item.teacherName || "담당 강사 없음"}</span>
        </div>

        <div className="flex flex-col gap-2 text-sm text-slate-600 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <Calendar size={14} />
            <span className="text-[11px] font-medium">일정 안내</span>
          </div>
          {item.schedules && item.schedules.length > 0 ? (
            <ul className="flex flex-col gap-1.5">
              {item.schedules.map((s, idx) => (
                <li key={idx} className="flex items-center justify-between font-medium">
                  <span className="text-slate-700">{daysMap[s.dayOfWeek]}요일 {s.startTime} - {s.endTime}</span>
                  <span className="flex items-center gap-1 text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded text-[11px] border border-slate-100">
                    <Building2 size={10} /> {s.room || "-"}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-medium text-slate-400">-</p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-600 text-sm font-medium">
            <Users size={14} />
            {item.currentStudents} / {item.capacity} 학생 수
          </div>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${isFull ? 'bg-red-500' : 'bg-slate-800'}`}
            style={{ width: `${progressRatio}%` }}
          />
        </div>
      </div>

      {isDetailOpen && (
        <CourseDetailModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          item={item}
        />
      )}
    </div>
  );
}
