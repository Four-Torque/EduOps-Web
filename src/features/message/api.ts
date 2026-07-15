import apiClient from "@/shared/lib/axios";
import type { MessageContact, MessageContactGroup } from "./type";

export async function fetchGroupedContacts(name?: string): Promise<MessageContactGroup[]> {
  const response = await apiClient.get("/user/grouped-by-role", {
    params: { name: name || undefined },
  });

  const body = response.data.body;

  const ROLE_LABEL: Record<string, string> = {
    director: "원장",
    teacher:  "강사",
    manager:  "관리자",
  };

  return Object.entries(body)
    .filter(([_, users]) => Array.isArray(users) && (users as any[]).length > 0)
    .map(([role, users]) => ({
      label: ROLE_LABEL[role] ?? role,
      contacts: (users as any[]).map((u): MessageContact => ({
        id:            String(u.id),
        name:          u.name,
        role:          role as MessageContact["role"],
        department:    u.department ?? undefined,
        avatarInitial: u.name ? u.name.slice(0, 1) : "",
      })),
    }));
}

export async function fetchSentMessages(): Promise<any[]> {
  // TODO: API 연동
  // const response = await apiClient.get("/message/sent");
  // return response.data.body;
  return [];
}

export async function fetchReceivedMessages(): Promise<any[]> {
  // TODO: API 연동
  // const response = await apiClient.get("/message/received");
  // return response.data.body;
  return [];
}

export async function sendMessage(receiverId: string, content: string): Promise<void> {
  await apiClient.post("/message", { receiverId, content });
}