"use client";

export function ScheduleHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <h1 className="text-[18px] font-bold text-slate-900">스케줄 관리</h1>
      <button className="text-[11.5px] font-medium text-white bg-slate-800 px-3 py-1.5 rounded hover:bg-slate-700 transition-colors">
        + 추가
      </button>
    </div>
  );
}