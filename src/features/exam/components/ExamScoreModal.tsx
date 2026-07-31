"use client";

import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { CardModal } from "@/shared/components/CardModal";
import { Input } from "@/shared/components/ui/input";
import { ExamItem, ExamStudent } from "../type";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchExamStudents, saveExamScores } from "../api";
import { toast } from "react-hot-toast";

interface ExamScoreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: ExamItem | null;
}

export function ExamScoreModal({ open, onOpenChange, exam }: ExamScoreModalProps) {
  const queryClient = useQueryClient();
  const [students, setStudents] = useState<ExamStudent[]>([]);

  const { data: fetchedStudents, isLoading } = useQuery({
    queryKey: ["examStudents", exam?.id],
    queryFn: () => fetchExamStudents(exam!.id),
    enabled: !!exam?.id && open,
  });

  useEffect(() => {
    if (fetchedStudents) {
      setStudents(fetchedStudents);
    }
  }, [fetchedStudents]);

  const saveMutation = useMutation({
    mutationFn: (results: { studentId: string; score: number }[]) => 
      saveExamScores(exam!.id, { results }),
    onSuccess: () => {
      toast.success("성적이 저장되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      onOpenChange(false);
    },
    onError: () => {
      toast.error("성적 저장에 실패했습니다.");
    }
  });

  const handleScoreChange = (id: string, value: string) => {
    const numValue = value === "" ? undefined : Number(value);
    setStudents(prev => 
      prev.map(s => s.id === id ? { ...s, score: numValue, status: numValue !== undefined ? "응시완료" : "미응시" } : s)
    );
  };

  const handleSave = () => {
    if (!exam) return;
    
    const results = students
      .filter(s => s.score !== undefined)
      .map(s => ({ studentId: s.id, score: s.score! }));
      
    if (results.length === 0) {
      toast.error("입력된 성적이 없습니다.");
      return;
    }
    
    saveMutation.mutate(results);
  };

  if (!exam) return null;

  return (
    <CardModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${exam.name} - 성적 입력`}
      description={`${exam.className || '전체 클래스'} 학생들의 성적을 입력해주세요.`}
      size="md"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saveMutation.isPending}>취소</Button>
          <Button onClick={handleSave} disabled={saveMutation.isPending || isLoading}>
            {saveMutation.isPending ? "저장 중..." : "일괄 저장"}
          </Button>
        </>
      }
    >
      <div className="py-2">
        {isLoading ? (
          <div className="text-center py-8 text-slate-500">불러오는 중...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-slate-50 text-slate-500 text-sm">
                <th className="px-4 py-2 text-left font-medium">이름</th>
                <th className="px-4 py-2 text-center font-medium">상태</th>
                <th className="px-4 py-2 text-right font-medium">점수</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b last:border-0 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium">{student.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.status === "응시완료" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Input 
                      type="number"
                      value={student.score ?? ""}
                      onChange={(e) => handleScoreChange(student.id, e.target.value)}
                      className="w-24 ml-auto text-right"
                      placeholder="미입력"
                      max={100}
                      min={0}
                    />
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-slate-500">
                    반에 배정된 학생이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </CardModal>
  );
}
