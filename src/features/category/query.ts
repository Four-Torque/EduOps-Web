import { useQuery } from "@tanstack/react-query";
import { findCategories } from "./api";

export function useFindCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: findCategories,
  });
  return query;
}
