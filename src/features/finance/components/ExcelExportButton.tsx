import { Button } from "@/shared/components/ui/button";
import { exportToCsv } from "@/shared/lib/export";
import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { fetchPayments } from "@/features/payment/api";
import { STATUS_LABELS } from "../constants";
import { formatDate } from "@/shared/lib/utils";

import { PaymentItem } from "@/features/payment/type";

export default function ExcelExportButton() {
  const filter = {
    search: "",
    status: "all",
    type: "all" as const,
  };

  async function handleExcelExport() {
    try {
      const response = await fetchPayments({
        search: filter.search || undefined,
        paymentType:
          filter.status === "all"
            ? undefined
            : (filter.status as "PAID" | "UNPAID" | "REFUNDED"),
        type: filter.type,
      });

      const exportItems = response.data;

      if (exportItems.length === 0) {
        toast.error("다운로드할 데이터가 없습니다.");
        return;
      }

      const headers = [
        "구분",
        "날짜",
        "항목",
        "상세",
        "대상자",
        "금액",
        "상태",
      ];
      const rows = exportItems.map((item: PaymentItem) => [
        "수입",
        item.paymentDate
          ? formatDate(new Date(item.paymentDate))
          : formatDate(new Date(item.createdAt)),
        item.title,
        item.className || "수강료",
        item.studentName || "-",
        item.amount,
        STATUS_LABELS[item.paymentType] || item.paymentType,
      ]);

      exportToCsv(`매출내역_${formatDate(new Date())}.csv`, headers, rows);
    } catch (error) {
      console.error(error);
      toast.error("다운로드 중 오류가 발생했습니다.");
    }
  }

  return (
    <Button variant="primary" size="sm" onClick={handleExcelExport}>
      <Download className="w-3.5 h-3.5" />
      엑셀
    </Button>
  );
}
