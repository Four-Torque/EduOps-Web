import apiClient from "@/shared/lib/axios";

export async function fetchDashboardStaffCount() {
  const response = await apiClient.get("/user");
  const totalUserCount = response.data.body.data.length;
  return totalUserCount ?? 0;
}

export async function fetchDashboardStudentStats() {
  const response = await apiClient.get("/student/stats");
  const totalStudentCount = response.data.body.totalStudents;
  return totalStudentCount ?? 0;
}

export async function fetchDashboardClassCount() {
  const response = await apiClient.get("/class");
  const totalClassCount = response.data.body.data.length;
  return totalClassCount ?? 0;
}

export async function fetchDashboardRecentAssets() {
  const response = await apiClient.get("/asset", { params: { limit: 10 } });
  return response.data.body?.data ?? [];
}

export async function fetchDashboardPendingUsers() {
  const response = await apiClient.get("/user", { params: { isApproved: "false", limit: 5 } });
  return response.data.body?.data ?? [];
}

export async function fetchDashboardRecentMessages() {
  const response = await apiClient.get("/message/conversations");
  const conversations = response.data.body ?? response.data ?? [];
  console.log(response);
  return conversations.slice(0, 5);
}

export async function fetchDashboardMonthlyTrends() {
  const response = await apiClient.get("/payment/monthly-trends");
  return response.data.body ?? response.data ?? [];
}

export async function fetchDashboardRecentPayments() {
  const response = await apiClient.get("/payment", { params: { paymentType: "PAID", limit: 10 } });
  return response.data.body?.data ?? [];
}
