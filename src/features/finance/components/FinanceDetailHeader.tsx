import { Finance } from "../type";

interface Props {
  totalAmount?: number;
  toggleDetails?: (date: string) => void;
  finance: Finance;
}

export default function FinanceDetailHeader({
  totalAmount,
  toggleDetails,
  finance,
}: Props) {
  return (
    <div
      className="flex justify-between items-center cursor-pointer px-6 bg-accent"
      onClick={() => toggleDetails && finance && toggleDetails(finance.date)}
    >
      <span className="text-lg dark:text-gray-300">{finance.date}</span>

      <span className="text-md text-gray-600 dark:text-gray-300 font-semibold">
        {new Intl.NumberFormat().format(totalAmount || 0)} 원
      </span>
    </div>
  );
}
