import { SESSION_KEY } from "@/constants/user/user.constants";
import { User } from "@/types/user/user.types";

export function getCachedSession(): User | null | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const cached = localStorage.getItem(SESSION_KEY);
  if (!cached) {
    return undefined;
  }

  try {
    return JSON.parse(cached) as User;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return undefined;
  }
}

export function hasCachedSession() {
  return getCachedSession() !== undefined;
}

export function setCachedSession(session: User | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return;
  }

  localStorage.removeItem(SESSION_KEY);
}
