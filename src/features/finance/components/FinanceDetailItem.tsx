import { CATEGORY_LABELS } from "../constants";
import { useFilterStore } from "../store";
import { FinanceDetail } from "../type";

interface FinanceDetailItemProps {
  detail: FinanceDetail;
}

export default function FinanceDetailItem({ detail }: FinanceDetailItemProps) {
  const { showExpense, showIncome } = useFilterStore();
  return (
    <li
      key={detail.id}
      className={`flex py-3 cursor-pointer ${
        detail.type === "EXPENSE" ? "bg-red-600/10" : "bg-blue-600/10"
      }`}
      onClick={() => {}}
    >
      <div className="px-6 flex justify-start items-center w-full">
        <div className="flex justify-start items-center w-full">
          <span className="text-sm text-gray-500 dark:text-gray-300 w-[5%]">
            {detail.time}
          </span>
          <div className="ml-10 flex md:justify-start justify-center items-center w-[10%]">
            <div className="text-sm text-gray-700 dark:text-gray-300 relative">
              <div
                className="absolute -bottom-3 -left-6 md:-left-11 md:-bottom-0.5 size-6 flex items-center justify-center rounded-full"
                style={{
                  backgroundColor:
                    CATEGORY_LABELS[detail.category]?.color || "",
                }}
              >
                <span className="text-sm">
                  {CATEGORY_LABELS[detail.category || ""]?.icon || ""}
                </span>
              </div>
              <p className="hidden md:block">
                {CATEGORY_LABELS[detail.category]?.name}
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 w-[40%] md:w-[20%]">
            {detail.title}
          </div>
        </div>
        <div
          className={`text-sm text-gray-700 dark:text-gray-300 text-right w-[35%] flex justify-center md:w-[20%]`}
        >
          {new Intl.NumberFormat().format(
            showExpense && showIncome && detail.type === "EXPENSE"
              ? -detail.amount
              : detail.amount,
          )}{" "}
          원
        </div>
      </div>
    </li>
  );
}
