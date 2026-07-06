import { findVendors } from "@/services/vendor/vendor.service";
import { useQuery } from "@tanstack/react-query";

export function useFindVendors(paramns: { page: string; limit: string }) {
  const query = useQuery({
    queryKey: ["vendors", paramns],
    queryFn: () => findVendors(paramns),
  });
  return query;
}
