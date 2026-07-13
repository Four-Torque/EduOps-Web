import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { View } from "react-big-calendar";

interface ScheduleUIState {
  view: View;
  date: Date;
  room: string;
  instructor: string;
  subject: string;
  isCreateOpen: boolean;

  setView: (view: View) => void;
  setDate: (date: Date) => void;
  setRoom: (room: string) => void;
  setInstructor: (instructor: string) => void;
  setSubject: (subject: string) => void;
  clearFilters: () => void;
  onCreateOpen: () => void;
  onCreateClose: () => void;
}

export const useScheduleStore = create<ScheduleUIState>()(
  devtools(
    (set) => ({
      view: "week",
      date: new Date(),
      room: "all",
      instructor: "all",
      subject: "all",
      isCreateOpen: false,

      setView: (view) => set({ view }, false, "schedule/set-view"),
      setDate: (date) => set({ date }, false, "schedule/set-date"),
      setRoom: (room) => set({ room }, false, "schedule/set-room"),
      setInstructor: (instructor) =>
        set({ instructor }, false, "schedule/set-instructor"),
      setSubject: (subject) => set({ subject }, false, "schedule/set-subject"),
      clearFilters: () =>
        set(
          { room: "all", instructor: "all", subject: "all" },
          false,
          "schedule/clear-filters",
        ),
      onCreateOpen: () =>
        set({ isCreateOpen: true }, false, "schedule/onCreateOpen"),
      onCreateClose: () =>
        set({ isCreateOpen: false }, false, "schedule/onCreateClose"),
    }),
    { name: "ScheduleStore" },
  ),
);
