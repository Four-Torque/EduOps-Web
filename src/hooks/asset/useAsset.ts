import {
  createAssetApplication,
  deleteAssetApplications,
  findAssetApplications,
  findAssets,
} from "@/services/asset/asset.service";
import { AssetApplicationFormSchema } from "@/validations/asset.valid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod/v3";

export function useFindAssetApplications(params: {
  page: string;
  limit: string;
  status?: string;
}) {
  const query = useQuery({
    queryKey: ["asset-applications", params],
    queryFn: () => findAssetApplications(params),
  });
  return query;
}

export function useFindAssets(params: {
  page: string;
  limit: string;
  search?: string;
}) {
  const query = useQuery({
    queryKey: ["assets", params],
    queryFn: () => findAssets(params),
  });
  return query;
}

export function useCreateAssetApplication() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof AssetApplicationFormSchema>) =>
      createAssetApplication(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["asset-applications"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useDeleteAssetApplications() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (ids: string[]) => deleteAssetApplications(ids),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["asset-applications"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
