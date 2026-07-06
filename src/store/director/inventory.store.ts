// import { create } from "zustand";
// import { devtools } from "zustand/middleware";
// import type { InventoryTabFilter } from "@/types/director/inventory.types";

// interface InventoryUIState {
//   statusFilter: InventoryTabFilter;
//   selectedIds: string[];
//   page: number; // ✅ 추가

//   setStatusFilter: (status: InventoryTabFilter) => void;
//   setPage: (page: number) => void; // ✅ 추가
//   toggleSelect: (id: string) => void;
//   toggleSelectAll: (ids: string[]) => void;
//   clearSelection: () => void;
// }

// export const useInventoryStore = create<InventoryUIState>()(
//   devtools(
//     (set) => ({
//       statusFilter: "all",
//       selectedIds: [],
//       page: 1,

//       setStatusFilter: (statusFilter) =>
//         set(
//           { statusFilter, selectedIds: [] },
//           false,
//           "inventory/set-status-filter",
//         ),

//       setPage: (page) => set({ page }, false, "inventory/set-page"),

//       toggleSelect: (id) =>
//         set(
//           (state) => ({
//             selectedIds: state.selectedIds.includes(id)
//               ? state.selectedIds.filter((x) => x !== id)
//               : [...state.selectedIds, id],
//           }),
//           false,
//           "inventory/toggle-select",
//         ),

//       toggleSelectAll: (ids) =>
//         set(
//           (state) => {
//             const allSelected = ids.every((id) =>
//               state.selectedIds.includes(id),
//             );
//             return { selectedIds: allSelected ? [] : [...ids] };
//           },
//           false,
//           "inventory/toggle-select-all",
//         ),

//       clearSelection: () =>
//         set({ selectedIds: [] }, false, "inventory/clear-selection"),
//     }),
//     { name: "InventoryStore" },
//   ),
// );
