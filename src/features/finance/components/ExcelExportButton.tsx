import { Button } from "@/shared/components/ui/button";
import { exportToCsv } from "@/shared/lib/export";
import { Download } from "lucide-react";
import toast from "react-hot-toast";
import { fetchPayments } from "../api";
import { STATUS_LABELS } from "../constants";
import { formatDate } from "@/shared/lib/utils";
import { useFinanceStore } from "../store";
import { RevenueItem } from "../type";

export default function ExcelExportButton() {
  const { filter } = useFinanceStore();

  async function handleExcelExport() {
    try {
      const response = await fetchPayments({
        search: filter.search || undefined,
        paymentType: filter.status === "all" ? undefined : filter.status,
        type: filter.type,
      });

      const exportItems = response.data;

      console.log("exportItems", response.data);

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
      const rows = exportItems.map((item: RevenueItem) => [
        item.type === "INCOME" ? "수입" : "지출",
        item.date,
        item.itemTitle,
        item.itemSub,
        item.studentName,
        item.amount,
        STATUS_LABELS[item.status] || item.status,
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
