import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AttendanceFilter, DepartmentType } from "./type";

interface AttendanceUIState {
  filter: AttendanceFilter;

  setMonth: (month: string) => void;
  setDepartment: (department: DepartmentType) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
}

export const useAttendanceStore = create<AttendanceUIState>()(
  devtools(
    (set) => ({
      filter: {
        month: "12월 2025년",
        department: "전체",
        search: "",
        page: 1,
      },

      setMonth: (month) =>
        set(
          (state) => ({ filter: { ...state.filter, month, page: 1 } }),
          false,
          "attendance/set-month",
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
    }),
    { name: "AttendanceStore" },
  ),
);
