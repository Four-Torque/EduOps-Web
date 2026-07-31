import { ExamDashboard } from "@/features/exam/components/ExamDashboard";
import { CreateExamModal } from "@/features/exam/components/CreateExamModal";

export default function ExamPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <CreateExamModal />
      </div>

      <ExamDashboard />
    </div>
  );
}