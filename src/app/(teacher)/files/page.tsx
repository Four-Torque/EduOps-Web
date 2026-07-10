import { FileUploadModal } from "@/features/file/components/FileUploadModal";
import { FileDashboard } from "@/features/file/components/FileDashboard";

export default function FilesPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-end">
        <FileUploadModal />
      </div>
      
      <FileDashboard />
    </div>
  );
}
