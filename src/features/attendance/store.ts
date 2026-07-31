import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AttendanceFilter, DepartmentType } from "./type";

interface AttendanceUIState {
  filter: AttendanceFilter;
  isRecordOpen: boolean;

  setMonth: (month: string) => void;
  setWeekStart: (weekStart: string) => void;
  setDepartment: (department: DepartmentType) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  onRecordOpen: () => void;
  onRecordClose: () => void;
}

function getDefaultWeekStart(monthStr: string): string {
  const match = monthStr.match(/(\d+)월\s+(\d+)년/);
  if (!match) return "";
  const monthNum = parseInt(match[1], 10) - 1;
  const yearNum = parseInt(match[2], 10);
  const today = new Date();

  if (today.getFullYear() === yearNum && today.getMonth() === monthNum) {
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const currentMonday = new Date(today.setDate(diff));
    const year = currentMonday.getFullYear();
    const m = String(currentMonday.getMonth() + 1).padStart(2, "0");
    const d = String(currentMonday.getDate()).padStart(2, "0");
    return `${year}-${m}-${d}`;
  } else {
    const firstDay = new Date(yearNum, monthNum, 1);
    const day = firstDay.getDay();
    const diff = day === 0 ? 1 : day === 1 ? 0 : 8 - day;
    const firstMonday = new Date(firstDay.setDate(firstDay.getDate() + diff));
    const year = firstMonday.getFullYear();
    const m = String(firstMonday.getMonth() + 1).padStart(2, "0");
    const d = String(firstMonday.getDate()).padStart(2, "0");
    return `${year}-${m}-${d}`;
  }
}

export const useAttendanceStore = create<AttendanceUIState>()(
  devtools(
    (set) => ({
      filter: {
        month: "7월 2026년",
        department: "전체",
        search: "",
        page: 1,
        limit: 10,
        weekStart: getDefaultWeekStart("7월 2026년"),
      },
      isRecordOpen: false,

      setMonth: (month) =>
        set(
          (state) => ({
            filter: {
              ...state.filter,
              month,
              weekStart: getDefaultWeekStart(month),
              page: 1,
            },
          }),
          false,
          "attendance/set-month",
        ),

      setWeekStart: (weekStart) =>
        set(
          (state) => ({ filter: { ...state.filter, weekStart, page: 1 } }),
          false,
          "attendance/set-weekstart",
        ),

      setDepartment: (department) =>
        set(
          (state) => ({ filter: { ...state.filter, department, page: 1 } }),
          false,
          "attendance/set-department",
        ),

      setSearch: (search) =>
        set(
          (state) => ({ filter: { ...state.filter, search, page: 1 } }),
          false,
          "attendance/set-search",
        ),

      setPage: (page) =>
        set(
          (state) => ({ filter: { ...state.filter, page } }),
          false,
          "attendance/set-page",
        ),

      setLimit: (limit) =>
        set(
          (state) => ({ filter: { ...state.filter, limit, page: 1 } }),
          false,
          "attendance/set-limit",
        ),

      onRecordOpen: () =>
        set({ isRecordOpen: true }, false, "attendance/onRecordOpen"),
      onRecordClose: () =>
        set({ isRecordOpen: false }, false, "attendance/onRecordClose"),
    }),
    { name: "AttendanceStore" },
  ),
);
