"use client";

import { useEffect }          from "react";
import { Button }             from "@/shared/components/ui/button";
import { AcademyInputField }  from "./AcademyInputField";
import { useAcademyInfoStore } from "@/features/academy/store";
import { useUpdateAcademyBasicInfo } from "@/features/academy/query";
import type { AcademyBasicInfo } from "@/features/academy/type";

interface AcademyBasicInfoFormProps {
  basicInfo: AcademyBasicInfo;
}

export function AcademyBasicInfoForm({ basicInfo }: AcademyBasicInfoFormProps) {
  const { editForm, startEdit, setEditField } = useAcademyInfoStore();
  const { mutate: save, isPending } = useUpdateAcademyBasicInfo();

  const form = editForm ?? basicInfo;

  useEffect(() => {
    if (!editForm) startEdit(basicInfo);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="border border-slate-200 rounded p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <AcademyInputField
            label="학원 이름"
            fieldKey="academyName"
            value={form.academyName}
          />
          <AcademyInputField
            label="대표자 명"
            fieldKey="representativeName"
            value={form.representativeName}
          />
          <AcademyInputField
            label="대표 전화번호"
            fieldKey="representativePhone"
            value={form.representativePhone}
          />
          <AcademyInputField
            label="사업자번호"
            fieldKey="businessNumber"
            value={form.businessNumber}
          />
        </div>

        <AcademyInputField
          label="주소"
          fieldKey="address"
          value={form.address}
          fullWidth
        />

        <div className="flex justify-end mt-4">
          <Button type="submit" variant="primary" size="sm" disabled={isPending}>
            {isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>
    </div>
  );
}