"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAcademyInfoStore } from "@/store/manager/academy-info.store";
import { useUpdateAcademyBasicInfo } from "@/hooks/manager/academy-info.hooks";
import type { AcademyBasicInfo } from "@/types/manager/academy-info.types";

interface AcademyBasicInfoFormProps {
  basicInfo: AcademyBasicInfo;
}

export function AcademyBasicInfoForm({ basicInfo }: AcademyBasicInfoFormProps) {
  const { editForm, startEdit, setEditField } = useAcademyInfoStore();
  const { mutate: save, isPending } = useUpdateAcademyBasicInfo();

  // 최초 진입 시 editForm 세팅
  const form = editForm ?? basicInfo;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="border border-slate-200 rounded p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <FormField label="학원 이름">
            <Input
              value={form.academyName}
              onChange={(e) => setEditField("academyName", e.target.value)}
              className="text-[12.5px]"
            />
          </FormField>

          <FormField label="대표자 명">
            <Input
              value={form.representativeName}
              onChange={(e) => setEditField("representativeName", e.target.value)}
              className="text-[12.5px]"
            />
          </FormField>

          <FormField label="대표 전화번호">
            <Input
              value={form.representativePhone}
              onChange={(e) => setEditField("representativePhone", e.target.value)}
              className="text-[12.5px]"
            />
          </FormField>

          <FormField label="사업자번호">
            <Input
              value={form.businessNumber}
              onChange={(e) => setEditField("businessNumber", e.target.value)}
              className="text-[12.5px]"
            />
          </FormField>
        </div>

        <FormField label="주소">
          <Input
            value={form.address}
            onChange={(e) => setEditField("address", e.target.value)}
            className="text-[12.5px]"
          />
        </FormField>

        <div className="flex justify-end mt-4">
          <Button type="submit" variant="primary" size="sm" disabled={isPending}>
            {isPending ? "저장 중..." : "저장"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-slate-600 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
