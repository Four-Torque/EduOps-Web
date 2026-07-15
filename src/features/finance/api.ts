import apiClient from "@/shared/lib/axios";

export async function getFinanceByPeriod(params: {
  startDate: string;
  endDate: string;
}) {
  const response = await apiClient.get(`/finance/period`, {
    params,
  });
  return response.data.body;
}

export async function getPaymentChart(params: {
  startDate: string;
  endDate: string;
}) {
  const response = await apiClient.get(`/finance/payments`, {
    params,
  });
  return response.data.body;
}

export async function getSalaryChart(params: {
  startDate: string;
  endDate: string;
}) {
  const response = await apiClient.get(`/finance/salaries`, {
    params,
  });
  return response.data.body;
}

export async function getAssetChart(params: {
  startDate: string;
  endDate: string;
}) {
  const response = await apiClient.get(`/finance/assets`, {
    params,
  });
  return response.data.body;
}
