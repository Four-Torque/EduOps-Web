import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod/v3";
import {
  findAssetApplications,
  findAssets,
  createAssetApplication,
  editAssetApplicationStatus,
  deleteAssetApplications,
} from "./api";
import { AssetApplicationFormSchema } from "./schema";

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
  categoryId?: string;
  vendorId?: string;
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

export function useEditAssetApplicationStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: {
      id: string;
      status: string;
      rejectedReason?: string;
    }) => editAssetApplicationStatus(values),

    onMutate: async (newValues) => {
      await queryClient.cancelQueries({ queryKey: ["asset-applications"] });

      const previousDetail = queryClient.getQueryData([
        "asset-applications",
        { id: newValues.id },
      ]);

      const previousList = queryClient.getQueryData(["asset-applications"]);

      queryClient.setQueryData(
        ["asset-applications", { id: newValues.id }],
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            status: newValues.status,
            rejectedReason: newValues.rejectedReason,
          };
        },
      );

      return { previousDetail, previousList };
    },

    onError: (err, newValues, context) => {
      if (err instanceof Error) {
        toast.error(err.message);
      }

      if (context?.previousDetail) {
        queryClient.setQueryData(
          ["asset-applications", { id: newValues.id }],
          context.previousDetail,
        );
      }
      if (context?.previousList) {
        queryClient.setQueryData(["asset-applications"], context.previousList);
      }
    },

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onSettled: (data, error, values) => {
      queryClient.invalidateQueries({
        queryKey: ["asset-applications", { id: values.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["asset-applications"],
      });
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
