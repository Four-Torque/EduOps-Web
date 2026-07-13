import { useQuery } from "@tanstack/react-query";
import { fetchSyllabuses } from "./api";

export const useSyllabuses = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ["syllabuses", page, limit],
    queryFn: () => fetchSyllabuses(page, limit),
  });
};
