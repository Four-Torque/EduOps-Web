"use client";

import { useAcademyInfo } from "@/features/academy/query";
import { AcademyBasicInfoForm } from "@/features/academy/components/form/AcademyBasicInfoForm";
import { AcademyOverviewPanel } from "@/features/academy/components/AcademyOverviewPanel";

export default function AcademyInfoPage() {
  const { data, isLoading } = useAcademyInfo();

  if (isLoading || !data) {
    return <p className="text-[12.5px] text-slate-400">불러오는 중...</p>;
  }

  return (
    <>
      <div className="flex gap-5 mb-8">
        <div className="flex-1">
          <AcademyBasicInfoForm basicInfo={data.basicInfo} />
        </div>
        <AcademyOverviewPanel overview={data.overview} />
      </div>
    </>
  );
}
