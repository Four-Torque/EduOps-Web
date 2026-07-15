import { SyllabusDashboard } from "@/features/syllabus/components/SyllabusDashboard";
import { CreateSyllabusModal } from "@/features/syllabus/components/CreateSyllabusModal";

export default function SyllabusPage() {
  return (
    <div className="w-full h-full bg-white flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <CreateSyllabusModal />
      </div>

      <SyllabusDashboard />
    </div>
  );
}