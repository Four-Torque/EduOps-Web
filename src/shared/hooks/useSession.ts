import { User } from "@/features/user/type";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import apiClient from "@/shared/lib/axios";

export function useSession() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const query = useQuery<User | null>({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const isLoading = !isMounted || query.isLoading;

  return {
    data: query.data,
    isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}

export async function getSession() {
  const response = await apiClient.get("/user/me");
  return response.data.body;
}
