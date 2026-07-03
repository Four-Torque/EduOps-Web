"use client";

import { AcademyBasicInfoForm }     from "./AcademyBasicInfoForm";
import { AcademyOverviewPanel }     from "./AcademyOverviewPanel";
import { AcademyBranchTable }       from "./AcademyBranchTable";
import { useAcademyInfo }           from "@/hooks/manager/academy-info.hooks";

export function AcademyInfoContainer() {
  const { data, isLoading } = useAcademyInfo();

  return (
    <div>
      {isLoading || !data ? (
        <p className="text-[12.5px] text-slate-400">불러오는 중...</p>
      ) : (
        <>
          <div className="flex gap-5 mb-8">
            <div className="flex-1">
              <AcademyBasicInfoForm basicInfo={data.basicInfo} />
            </div>
            <AcademyOverviewPanel overview={data.overview} />
          </div>

          <AcademyBranchTable branches={data.branches} />
        </>
      )}
    </div>
  );
}
