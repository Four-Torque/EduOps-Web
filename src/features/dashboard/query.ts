import { useQuery } from "@tanstack/react-query";
import {
  fetchDashboardStaffCount,
  fetchDashboardStudentStats,
  fetchDashboardClassCount,
  fetchDashboardRecentAssets,
  fetchDashboardPendingUsers,
  fetchDashboardRecentMessages,
  fetchDashboardMonthlyTrends,
  fetchDashboardRecentPayments,
} from "./api";

export const dashboardQueryKeys = {
  all: () => ["dashboard"] as const,
  staffCount: () => ["dashboard", "staffCount"] as const,
  studentStats: () => ["dashboard", "studentCount"] as const,
  classCount: () => ["dashboard", "classCount"] as const,
  recentAssets: () => ["dashboard", "recentAssets"] as const,
  pendingUsers: () => ["dashboard", "pendingUsers"] as const,
  recentMessages: () => ["dashboard", "recentMessages"] as const,
  monthlyTrends: (startDate: string, endDate: string) => ["dashboard", "monthlyTrends", startDate, endDate] as const,
  recentPayments: () => ["dashboard", "recentPayments"] as const,
};

export function useDashboardStaffCount() {
  return useQuery({
    queryKey: dashboardQueryKeys.staffCount(),
    queryFn: fetchDashboardStaffCount,
  });
}

export function useDashboardStudentStats() {
  return useQuery({
    queryKey: dashboardQueryKeys.studentStats(),
    queryFn: fetchDashboardStudentStats,
  });
}

export function useDashboardClassCount() {
  return useQuery({
    queryKey: dashboardQueryKeys.classCount(),
    queryFn: fetchDashboardClassCount,
  });
}

export function useDashboardRecentAssets() {
  return useQuery({
    queryKey: dashboardQueryKeys.recentAssets(),
    queryFn: fetchDashboardRecentAssets,
  });
}

export function useDashboardPendingUsers() {
  return useQuery({
    queryKey: dashboardQueryKeys.pendingUsers(),
    queryFn: fetchDashboardPendingUsers,
  });
}

export function useDashboardRecentMessages() {
  return useQuery({
    queryKey: dashboardQueryKeys.recentMessages(),
    queryFn: fetchDashboardRecentMessages,
  });
}

export function useDashboardRecentPayments() {
  return useQuery({
    queryKey: dashboardQueryKeys.recentPayments(),
    queryFn: fetchDashboardRecentPayments,
  });
}

export function useDashboardMonthlyTrends(startDate: string, endDate: string) {
  return useQuery({
    queryKey: dashboardQueryKeys.monthlyTrends(startDate, endDate),
    queryFn: () => fetchDashboardMonthlyTrends(startDate, endDate),
  });
}
