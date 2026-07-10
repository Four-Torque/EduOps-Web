"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchClassFiles } from "../api";
import { FileFilterBar } from "./FileFilterBar";
import { FileListTable } from "./FileListTable";
import { useSession } from "@/shared/hooks/useSession";

export function FileDashboard() {
  const [classId, setClassId] = useState<string>("all-class");
  const [fileName, setFileName] = useState<string>("");
  const { data: user } = useSession();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const actualClassId = classId === "all-class" ? undefined : classId;
  const actualFileName = fileName.trim() === "" ? undefined : fileName;

  const { data: filesResponse, isLoading } = useQuery({
    queryKey: ["classFiles", actualClassId, actualFileName, page],
    queryFn: () => fetchClassFiles(actualClassId, actualFileName, page, 10),
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
      <FileListTable files={filesResponse} isLoading={isLoading} />
    </div>
  );
}
