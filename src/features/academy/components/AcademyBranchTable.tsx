import { PlusCircle }              from "lucide-react";
import { Table }                   from "@/shared/components/Table";
import type { ColumnProps }        from "@/shared/components/Table";
import type { AcademyBranch }      from "@/features/academy/type";

interface AcademyBranchTableProps {
  columns: ColumnProps[];
  branches: AcademyBranch[];
  onDelete: (ids: string[]) => void;
}

export function AcademyBranchTable({
  columns,
  branches,
  onDelete,
}: AcademyBranchTableProps) {
  const tableData = {
    data:       branches,
    total:      branches.length,
    totalPages: 1,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold text-slate-900">지점</h2>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <PlusCircle className="w-4 h-4" />
        </button>
      </div>

      <Table
        columns={columns}
        data={tableData}
        showCheckbox={false}
        onDelete={onDelete}
      />
    </div>
  );
}
