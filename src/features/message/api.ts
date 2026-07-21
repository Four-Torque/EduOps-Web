import apiClient from "@/shared/lib/axios";

export async function fetchGroupedContacts(name?: string) {
  const response = await apiClient.get("/user/grouped-by-role", {
    params: { name: name || undefined },
  });

  return response.data.body;
}

export async function sendMessage(values: {
  receiverId: string;
  title: string;
  content: string;
}) {
  const response = await apiClient.post("/message", values);
  return response.data;
}

export async function findReceivedMessages(params: {
  page?: number | string;
  limit?: number | string;
}) {
  const responses = await apiClient.get("/message/received", { params });
  return responses.data.body;
}

export async function findSentMessages(params: {
  page?: number | string;
  limit?: number | string;
}) {
  const responses = await apiClient.get("/message/sent", { params });
  return responses.data.body;
}

export async function markMessageAsRead(id?: string) {
  const response = await apiClient.put(`/message/${id}/read`);
  return response.data;
}

export async function deleteMessages(values: {
  ids: string[];
  type: "SENT" | "RECEIVED";
}) {
  const response = await apiClient.delete("/message", {
    data: values,
  });
  return response.data;
}
