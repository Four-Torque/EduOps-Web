export type Asset = {
  id: string;
  categoryName: string;
  categoryId: string;
  name: string;
  stock: number;
  vendorName: string;
  vendorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AssetApplication = {
  id: string;
  userName: string;
  userId: string;
  categoryName: string;
  categoryId: string;
  vendorName: string;
  vendorId: string;
  assetId: string;
  assetName: string;
  stock?: number;
  quantity: number;
  price: number;
  reason: string;
  rejectedReason?: string;
  status: ApplicationStatus;
  requestedAt: Date;
  processedAt?: Date;
};

export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type MaterialCategory = "교재" | "비품";
export type MaterialTabFilter = "all" | ApplicationStatus;
