"use client";

import { useMemo } from "react";
import { useAcademyInfo, useDeleteAcademyBranch } from "@/features/academy/query";
import { useAcademyInfoStore } from "@/features/academy/store";
import { AcademyBasicInfoForm } from "@/features/academy/components/form/AcademyBasicInfoForm";
import { AcademyOverviewPanel } from "@/features/academy/components/AcademyOverviewPanel";
import { Table } from "@/shared/components/Table";
import { useConfirm } from "@/shared/hooks/useConfirm";
import { getBranchColumns } from "./colum";

export default function AcademyInfoPage() {
  const { data, isLoading } = useAcademyInfo();
  const { mutate: deleteBranch } = useDeleteAcademyBranch();
  const { onEditOpen } = useAcademyInfoStore();

  const [ConfirmDialog, confirm] = useConfirm(
    "정말 삭제하시겠습니까?",
    "삭제된 데이터는 복구할 수 없습니다.",
  );

  async function handleDelete(ids: string[]) {
    const ok = await confirm();
    if (ok) {
      ids.forEach((id) => deleteBranch(Number(id)));
    }
  }

  function handleEdit(id: string) {
    onEditOpen(id);
  }

  const columns = useMemo(
    () => getBranchColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    [],
  );

  // branches를 Table의 data 형태로 변환
  const branchTableData = {
    data:       data?.branches ?? [],
    total:      data?.branches.length ?? 0,
    totalPages: 1,
  };

  if (isLoading || !data) {
    return <p className="text-[12.5px] text-slate-400">불러오는 중...</p>;
  }

  return (
    <>
      {/* 기본 정보 + 개요 */}
      <div className="flex gap-5 mb-8">
        <div className="flex-1">
          <AcademyBasicInfoForm basicInfo={data.basicInfo} />
        </div>
        <AcademyOverviewPanel overview={data.overview} />
      </div>

      {/* 지점 테이블 */}
      <div>
        <h2 className="text-[15px] font-bold text-slate-900 mb-3">지점</h2>
        <Table
          columns={columns}
          data={branchTableData}
          isLoading={isLoading}
          showCheckbox={false}
        />
      </div>

      <ConfirmDialog />
    </>
  );
}