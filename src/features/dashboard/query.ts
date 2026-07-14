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
  monthlyTrends: () => ["dashboard", "monthlyTrends"] as const,
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

export function useDashboardMonthlyTrends() {
  return useQuery({
    queryKey: dashboardQueryKeys.monthlyTrends(),
    queryFn: fetchDashboardMonthlyTrends,
  });
}

export function useDashboardRecentPayments() {
  return useQuery({
    queryKey: dashboardQueryKeys.recentPayments(),
    queryFn: fetchDashboardRecentPayments,
  });
}
