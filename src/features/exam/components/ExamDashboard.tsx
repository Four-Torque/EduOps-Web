"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExamFilterBar } from "./ExamFilterBar";
import { ExamListTable } from "./ExamListTable";
import { ExamScoreModal } from "./ExamScoreModal";
import { EditExamModal } from "./EditExamModal";
import { ExamItem } from "../type";
import { fetchExams } from "../api";

export function ExamDashboard() {
  const [classId, setClassId] = useState<string>("all-class");
  const [period, setPeriod] = useState<string>("all");
  
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
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

      <EditExamModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        exam={selectedExam}
      />
    </div>
  );
}
