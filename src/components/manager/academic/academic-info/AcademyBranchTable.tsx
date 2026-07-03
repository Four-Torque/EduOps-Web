import { Pencil, Settings, Trash2 } from "lucide-react";
import type { AcademyBranch } from "@/types/manager/academy-info.types";

interface AcademyBranchTableProps {
  branches: AcademyBranch[];
}

const STATUS_LABEL: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
};

const STATUS_STYLE: Record<string, string> = {
  active: "text-emerald-700 bg-emerald-50",
  inactive: "text-slate-500 bg-slate-100",
};

export function AcademyBranchTable({ branches }: AcademyBranchTableProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold text-slate-900">지점</h2>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="border border-slate-200 rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-[#f5f6f8]">
              {["Branch Name", "Manager", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500 text-left"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr
                key={branch.id}
                className="border-b border-slate-100 last:border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <td className="px-3.5 py-2.5 text-[12.5px] font-medium text-slate-800">
                  {branch.branchName}
                </td>
                <td className="px-3.5 py-2.5 text-[12.5px] text-slate-600">{branch.manager}</td>
                <td className="px-3.5 py-2.5">
                  <span className={`inline-block text-[10.5px] font-medium px-2.5 py-0.5 rounded-full ${STATUS_STYLE[branch.status]}`}>
                    {STATUS_LABEL[branch.status]}
                  </span>
                </td>
                <td className="px-3.5 py-2.5">
                  <div className="flex items-center gap-2.5">
                     <button className="text-slate-400 hover:text-slate-600 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button className="text-slate-400 hover:text-red-500 ...">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  </div>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
