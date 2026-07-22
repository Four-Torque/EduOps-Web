import { ColumnProps } from "@/shared/components/Table";
import { formatDate } from "@/shared/lib/utils";

export const getAssetInventoryColumns = (): ColumnProps[] => [
  {
    key: "name",
    label: "품목",
    render: (item) => <p className="text-center">{item.name}</p>,
  },
  {
    key: "categoryName",
    label: "분류",
    render: (item) => <p className="text-center">{item.categoryName}</p>,
  },
  {
    key: "stock",
    label: "재고",
    render: (item) => <p className="text-center">{item.stock}</p>,
  },
  {
    key: "vendorName",
    label: "구매처",
    render: (item) => <p className="text-center">{item.vendorName}</p>,
  },
  {
    key: "createdAt",
    label: "최초 등록일",
    render: (item) => (
      <p className="text-center">{formatDate(item.createdAt)}</p>
    ),
  },
];
