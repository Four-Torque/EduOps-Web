// @/store/manager/schedule.store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { View } from "react-big-calendar";

interface ScheduleUIState {
  view: View; // "week" | "month" | "day" | "agenda" ...
  date: Date; // 현재 보고 있는 날짜
  room: string;
  instructor: string;
  subject: string;

  setView: (view: View) => void;
  setDate: (date: Date) => void;
  setRoom: (room: string) => void;
  setInstructor: (instructor: string) => void;
  setSubject: (subject: string) => void;
  clearFilters: () => void;
}

export const useScheduleStore = create<ScheduleUIState>()(
  devtools(
    (set) => ({
      view: "week",
      date: new Date(2023, 9, 16), // 목 데이터 기준 주로 시작 (실제론 new Date())
      room: "all",
      instructor: "all",
      subject: "math",

      setView: (view) => set({ view }, false, "schedule/set-view"),
      setDate: (date) => set({ date }, false, "schedule/set-date"),
      setRoom: (room) => set({ room }, false, "schedule/set-room"),
      setInstructor: (instructor) =>
        set({ instructor }, false, "schedule/set-instructor"),
      setSubject: (subject) => set({ subject }, false, "schedule/set-subject"),
      clearFilters: () =>
        set(
          { room: "all", instructor: "all", subject: "math" },
          false,
          "schedule/clear-filters",
        ),
    }),
    { name: "ScheduleStore" },
  ),
);
