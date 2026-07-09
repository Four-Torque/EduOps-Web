// @/store/manager/course.store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { CourseLevelFilter } from "@/features/class/type";

interface CourseUIState {
  searchQuery: string;
  subject: string;
  level: CourseLevelFilter;
  page: number;

  setSearchQuery: (query: string) => void;
  setSubject: (subject: string) => void;
  setLevel: (level: CourseLevelFilter) => void;
  setPage: (page: number) => void;
}

export const useCourseStore = create<CourseUIState>()(
  devtools(
    (set) => ({
      searchQuery: "",
      subject: "all",
      level: "all",
      page: 1,

      setSearchQuery: (searchQuery) =>
        set({ searchQuery, page: 1 }, false, "course/set-search-query"),
      setSubject: (subject) =>
        set({ subject, page: 1 }, false, "course/set-subject"),
      setLevel: (level) => set({ level, page: 1 }, false, "course/set-level"),
      setPage: (page) => set({ page }, false, "course/set-page"),
    }),
    { name: "CourseStore" },
  ),
);
