import { findCategories } from "@/services/category/category.service";
import { useQuery } from "@tanstack/react-query";

export function useFindCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: findCategories,
  });
  return query;
}
