import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Plus, Trash2, User, Phone } from "lucide-react";
import { Student } from "@/features/student/type";
import { EnrollmentResponse } from "@/features/enrollment/type";

export interface StudentFormData {
  selectedStudentId: string;
}

interface ClassStudentTabProps {
  enrollments: any[];
  capacity: number;
  students: Student[];
  formData: StudentFormData;
  onChange: (field: keyof StudentFormData, value: string) => void;
  handleAddStudent: () => void;
  handleDeleteEnrollment: (id: string) => void;
  isAddingStudent: boolean;
}

export const ClassStudentTab = (props: ClassStudentTabProps) => {
  const {
    enrollments,
    capacity,
    students,
    formData,
    onChange,
    handleAddStudent,
    handleDeleteEnrollment,
    isAddingStudent,
  } = props;

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-slate-50/50 p-5 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-[15px] text-slate-800 flex items-center gap-2">
            <User size={16} className="text-purple-500" />
            수강생 목록
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
              {enrollments.length} / {capacity}
            </span>
          </h4>
        </div>

        {enrollments.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            {enrollments.map((e: EnrollmentResponse) => (
              <li
                key={e.id}
                className="group flex items-center justify-between bg-white p-3 rounded-md border border-slate-200 shadow-sm hover:border-purple-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800">
                      {e.studentName || "이름없음"}
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone size={10} /> {e.studentPhone || "전화번호 없음"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteEnrollment(e.id)}
                  className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="수강 취소"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 bg-white rounded-md border border-dashed border-slate-200">
            <User size={24} className="text-slate-300 mb-2" />
            <p className="text-sm text-slate-500">
              현재 등록된 수강생이 없습니다.
            </p>
          </div>
        )}
      </div>

      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
        <h4 className="font-bold text-[15px] text-slate-800 mb-4 flex items-center gap-2">
          <Plus size={16} className="text-purple-500" />새 수강생 등록
        </h4>
        <div className="flex gap-3 items-end">
          <div className="flex flex-col gap-1.5 flex-1">
            <Label className="text-xs text-slate-600 font-medium">
              원생 선택
            </Label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-purple-500 focus-visible:border-purple-500"
              value={formData.selectedStudentId}
              onChange={(e) => onChange("selectedStudentId", e.target.value)}
            >
              <option value="">등록할 원생을 선택하세요</option>
              {students.map((st: Student) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.Phonenumber})
                </option>
              ))}
            </select>
          </div>
          <Button
            onClick={handleAddStudent}
            disabled={!formData.selectedStudentId || isAddingStudent}
          >
            <Plus size={16} className="mr-1" /> 등록
          </Button>
        </div>
      </div>
    </div>
  );
};
