import { FileUploadModal } from "@/features/file/components/FileUploadModal";
import { FileDashboard } from "@/features/file/components/FileDashboard";

export default function FilesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <FileUploadModal />
      </div>
      
      <FileDashboard />
    </div>
  );
}
