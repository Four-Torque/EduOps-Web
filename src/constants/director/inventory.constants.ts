import type {
  InventoryPaymentStatus,
  InventoryTabFilter,
  InventoryItem,
} from "@/types/director/inventory.types";

export const INVENTORY_STATUS_OPTIONS: { label: string; value: InventoryTabFilter }[] = [
  { label: "결제 상태", value: "all"     },
  { label: "결제완료",  value: "paid"    },
  { label: "결제 대기", value: "pending" },
];

export const INVENTORY_STATUS_LABEL: Record<InventoryPaymentStatus, string> = {
  paid:    "결제완료",
  pending: "결제 대기",
};

export const INVENTORY_STATUS_STYLE: Record<InventoryPaymentStatus, string> = {
  paid:    "text-white bg-[#E07B39] hover:bg-[#c96a2e]",
  pending: "text-white bg-[#6B7280] hover:bg-[#4B5563]",
};

export const INVENTORY_TABLE_COLUMNS = [
  { key: "name",      label: "품목"  },
  { key: "category",  label: "분류"  },
  { key: "quantity",  label: "수량"  },
  { key: "supplier",  label: "구매처" },
  { key: "amount",    label: "금액"  },
  { key: "stock",     label: "재고"  },
  { key: "requester", label: "신청자" },
  { key: "status",    label: "상태"  },
] as const;

export const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  { id: 1, name: "수학 문제집 40부", category: "교재", quantity: 12, supplier: "대한출판",   amount: 120000, stock: 12, requester: "송다은", status: "paid"    },
  { id: 2, name: "A4용지 5박스",     category: "비품", quantity: 12, supplier: "오피스마트", amount: 120000, stock: 12, requester: "송다은", status: "paid"    },
  { id: 3, name: "국어 교재 60부",   category: "교재", quantity: 12, supplier: "한빛교육",   amount: 120000, stock: 12, requester: "송다은", status: "paid"    },
  { id: 4, name: "프린트 토너",      category: "비품", quantity: 12, supplier: "오피스마트", amount: 120000, stock: 12, requester: "송다은", status: "paid"    },
  { id: 5, name: "에어컨 점검",      category: "비품", quantity: 22, supplier: "오피스마트", amount: 120000, stock: 22, requester: "송다은", status: "paid"    },
  { id: 6, name: "화이트보드 마커",  category: "비품", quantity: 12, supplier: "오피스마트", amount: 120000, stock: 12, requester: "송다은", status: "pending" },
];
