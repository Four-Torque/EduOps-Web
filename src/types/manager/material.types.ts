export type MaterialPaymentStatus = "ACCEPTED" | "REJECTED" | "PENDING";
export type MaterialCategory = "교재" | "비품";
export type MaterialTabFilter = "all" | MaterialPaymentStatus;

// export interface InventoryItem {
//   id: number;
//   name: string;
//   category: InventoryCategory;
//   quantity: number;
//   supplier: string;
//   amount: number;
//   stock: number;
//   requester: string;
//   status: InventoryPaymentStatus;
// }

// export interface InventoryListResponse {
//   items: InventoryItem[];
//   totalItems: number;
//   totalPages: number; // ✅ 추가
// }
