// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useDirectorUserStore } from "./store";
// import { UserApprovalStatus, DirectorUserListResponse } from "./type";

// export const directorUserQueryKeys = {
//   all: () => ["director-users"] as const,
//   list: (tab: string, page: number) =>
//     ["director-users", "list", tab, page] as const,
// };

// export function useDirectorUsers() {
//   const { tab, page } = useDirectorUserStore();

//   return useQuery({
//     queryKey: directorUserQueryKeys.list(tab, page),
//     queryFn: () => fetchDirectorUsers(tab, page),
//     placeholderData: (prev) => prev,
//   });
// }

// export function useUpdateDirectorUserStatus() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       userId,
//       status,
//     }: {
//       userId: number;
//       status: UserApprovalStatus;
//     }) => updateDirectorUserStatus(userId, status),

//     onMutate: async ({ userId, status }) => {
//       await queryClient.cancelQueries({
//         queryKey: directorUserQueryKeys.all(),
//       });

//       const previousData = queryClient.getQueriesData<DirectorUserListResponse>(
//         {
//           queryKey: directorUserQueryKeys.all(),
//         },
//       );

//       queryClient.setQueriesData(
//         { queryKey: directorUserQueryKeys.all() },
//         (old: DirectorUserListResponse | undefined) => {
//           if (!old?.items) return old;
//           return {
//             ...old,
//             items: old.items.map((u) =>
//               u.id === userId ? { ...u, status } : u,
//             ),
//           };
//         },
//       );

//       return { previousData };
//     },

//     onError: (_error, _variables, context) => {
//       context?.previousData.forEach(([key, data]) => {
//         queryClient.setQueryData(key, data);
//       });
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: directorUserQueryKeys.all() });
//     },
//   });
// }

// export function useDeleteDirectorUsers() {
//   const queryClient = useQueryClient();
//   const clearSelection = useDirectorUserStore((state) => state.clearSelection);

//   return useMutation({
//     mutationFn: deleteDirectorUsers,
//     onSuccess: () => {
//       clearSelection();
//       queryClient.invalidateQueries({ queryKey: directorUserQueryKeys.all() });
//     },
//   });
// }
