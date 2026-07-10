"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExamFilterBar } from "./ExamFilterBar";
import { ExamListTable } from "./ExamListTable";
import { ExamScoreModal } from "./ExamScoreModal";
import { CreateExamModal } from "./CreateExamModal";
import { EditExamModal } from "./EditExamModal";
import { ExamItem } from "../type";
import { fetchExams } from "../api";

export function ExamDashboard() {
  const [classId, setClassId] = useState<string>("all-class");
  const [period, setPeriod] = useState<string>("all");
  
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: exams = [], isLoading } = useQuery({
    queryKey: ["exams", classId, period],
    queryFn: () => fetchExams(classId, period),
  });

  const handleResetFilters = () => {
    setClassId("all-class");
    setPeriod("all");
  };

  const handleExamClick = (exam: ExamItem) => {
    setSelectedExam(exam);
    setIsScoreModalOpen(true);
  };

  const handleManageClick = (exam: ExamItem) => {
    setSelectedExam(exam);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div />
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-slate-900 text-white px-4 py-2 flex items-center gap-2 rounded-md font-medium text-sm hover:bg-slate-800 transition-colors"
        >
          <span className="text-lg leading-none">+</span> 새 테스트 등록
        </button>
      </div>

      <ExamFilterBar 
        classId={classId}
        setClassId={setClassId}
        period={period}
        setPeriod={setPeriod}
        onReset={handleResetFilters}
      />
      
      <ExamListTable 
        exams={exams} 
        isLoading={isLoading}
        onExamClick={handleExamClick} 
        onManageClick={handleManageClick}
      />

      <ExamScoreModal 
        open={isScoreModalOpen}
        onOpenChange={setIsScoreModalOpen}
        exam={selectedExam}
      />

      <CreateExamModal 
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      <EditExamModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        exam={selectedExam}
      />
    </div>
  );
}
