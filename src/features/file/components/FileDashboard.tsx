"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FileFilterBar } from "./FileFilterBar";
import { FileListTable } from "./FileListTable";
import { useSession } from "@/shared/hooks/useSession";
import { useFindClassFiles } from "../query";

export function FileDashboard() {
  const [classId, setClassId] = useState<string>("all-class");
  const [fileName, setFileName] = useState<string>("");
  const { data: user } = useSession();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading } = useFindClassFiles({
    page,
    limit,
    search: fileName,
    classId: classId === "all-class" ? undefined : classId,
  });

  return (
    <div className="flex flex-col gap-4">
      <FileFilterBar
        teacherId={user ? user.id : ""}
        classId={classId}
        setClassId={setClassId}
        fileName={fileName}
        setFileName={setFileName}
      />
      <FileListTable data={data} isLoading={isLoading} />
    </div>
  );
}
