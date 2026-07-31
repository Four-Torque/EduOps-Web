import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod/v3";
import {
  findVendors,
  findVendorById,
  createVendor,
  editVendor,
  deleteVendors,
} from "./api";
import { VendorFormSchema } from "./schema";

export function useFindVendors(paramns: {
  page: number;
  limit: number;
  search?: string;
}) {
  const query = useQuery({
    queryKey: ["vendors", paramns],
    queryFn: () => findVendors(paramns),
  });
  return query;
}

export function useFindVendorById(id?: string) {
  const query = useQuery({
    queryKey: ["vendor", { id }],
    queryFn: () => findVendorById(id),
    enabled: !!id,
  });
  return query;
}

export function useCreateVendor() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createVendor,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useEditVendor(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof VendorFormSchema>) =>
      editVendor(values, id),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
      queryClient.invalidateQueries({ queryKey: ["vendor", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useDeleteVendors() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (ids: string[]) => deleteVendors(ids),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
