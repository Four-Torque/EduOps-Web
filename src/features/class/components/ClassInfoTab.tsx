import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";

import { Teacher } from "@/features/user/type";
import { Subject } from "@/features/subject/type";

export interface InfoFormData {
  name: string;
  fee: string;
  capacity: string;
  startDate: string;
  endDate: string;
  teacherId: string;
  subjectName: string;
}

interface ClassInfoTabProps {
  formData: InfoFormData;
  onChange: (field: keyof InfoFormData, value: string) => void;
  teachers: Teacher[];
  subjects: Subject[];
  handleUpdate: () => void;
  isUpdating: boolean;
}

export const ClassInfoTab = (props: ClassInfoTabProps) => {
  const {
    formData,
    onChange,
    teachers,
    subjects,
    handleUpdate,
    isUpdating,
  } = props;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="courseName">강좌명</Label>
        <Input
          id="courseName"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="teacher">담당 강사</Label>
          <select
            id="teacher"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.teacherId}
            onChange={(e) => onChange("teacherId", e.target.value)}
          >
            <option value="" disabled>
              강사를 선택하세요
            </option>
            {teachers.map((t: Teacher) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="subject">담당 과목</Label>
          <select
            id="subject"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.subjectName}
            onChange={(e) => onChange("subjectName", e.target.value)}
          >
            <option value="" disabled>
              과목을 선택하세요
            </option>
            {subjects.map((s: Subject) => (
              <option key={s.name} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>수강료 (원)</Label>
          <Input
            type="number"
            value={formData.fee}
            onChange={(e) => onChange("fee", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>정원 (명)</Label>
          <Input
            type="number"
            value={formData.capacity}
            onChange={(e) => onChange("capacity", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>시작일</Label>
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>종료일</Label>
          <Input
            type="date"
            value={formData.endDate}
            onChange={(e) => onChange("endDate", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={handleUpdate} disabled={isUpdating}>
          {isUpdating ? "수정 중..." : "수정하기"}
        </Button>
      </div>
    </div>
  );
};
