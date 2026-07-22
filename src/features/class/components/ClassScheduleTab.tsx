import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Plus, Trash2, Calendar, Clock, MapPin } from "lucide-react";
import {
  DAY_LABELS,
  DAY_OF_WEEK_OPTIONS,
} from "@/shared/constants/day.constants";
import { ClassInfo } from "@/features/class/type";

export interface ScheduleFormData {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
}

interface ClassScheduleTabProps {
  schedules: ClassInfo["schedules"];
  formData: ScheduleFormData;
  onChange: (field: keyof ScheduleFormData, value: string) => void;
  handleAddSchedule: () => void;
  handleDeleteSchedule: (id: string) => void;
  isAddingSchedule: boolean;
}

export const ClassScheduleTab = (props: ClassScheduleTabProps) => {
  const {
    schedules,
    formData,
    onChange,
    handleAddSchedule,
    handleDeleteSchedule,
    isAddingSchedule,
  } = props;

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-slate-50/50 p-5 rounded-lg border border-slate-200 shadow-sm">
        <h4 className="font-bold text-[15px] text-slate-800 mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-blue-500" />
          현재 스케줄
        </h4>
        {schedules && schedules.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {schedules.map((s) => (
              <li
                key={s.id}
                className="group flex flex-col justify-center text-sm bg-white p-3.5 rounded-md border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-200 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400"></div>
                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1.5 pl-2">
                    <span className="font-semibold text-slate-700">
                      {DAY_LABELS[s.dayOfWeek]}요일
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
          <Plus size={16} className="text-emerald-500" />새 스케줄 추가
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-slate-600 font-medium">요일</Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
              value={formData.dayOfWeek}
              onChange={(e) => onChange("dayOfWeek", e.target.value)}
            >
              {DAY_OF_WEEK_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-slate-600 font-medium">
              시작 시간
            </Label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) => onChange("startTime", e.target.value)}
              className="h-10 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-slate-600 font-medium">
              종료 시간
            </Label>
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e) => onChange("endTime", e.target.value)}
              className="h-10 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs text-slate-600 font-medium">강의실</Label>
            <Input
              value={formData.room}
              onChange={(e) => onChange("room", e.target.value)}
              className="h-10 focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
              placeholder="예: 101호"
            />
          </div>
        </div>
        <Button
          onClick={handleAddSchedule}
          disabled={isAddingSchedule}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          <Plus size={16} className="mr-1.5" /> 스케줄 추가하기
        </Button>
      </div>
    </div>
  );
};
