"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import {
  useTeacherDetail,
  useUpdateTeacher,
  useCreateTeacherSalary,
  useUpdateTeacherSalary,
} from "../query";
import type {
  TeacherStatus,
  SalaryStatus,
  TeacherSalary,
  UpdateTeacherInput,
} from "../type";

const TEACHER_STATUS_LABEL: Record<TeacherStatus, string> = {
  WORKING: "재직",
  ON_LEAVE: "휴직",
  RESIGNED: "퇴사",
};

const TEACHER_STATUS_STYLE: Record<TeacherStatus, string> = {
  WORKING: "bg-[#0069A8]/10 text-[#0069A8]",
  ON_LEAVE: "bg-amber-50 text-amber-600",
  RESIGNED: "bg-slate-100 text-slate-400",
};

const SALARY_STATUS_LABEL: Record<SalaryStatus, string> = {
  PENDING: "지급 대기",
  COMPLETED: "지급 완료",
};

const SALARY_STATUS_STYLE: Record<SalaryStatus, string> = {
  PENDING: "bg-amber-50 text-amber-600",
  COMPLETED: "bg-[#0069A8]/10 text-[#0069A8]",
};

function formatWon(amount: number) {
  return `${amount.toLocaleString("ko-KR")}원`;
}

interface SalaryFormState {
  baseSalary: string;
  bonus: string;
  paymentDate: string;
  status: SalaryStatus;
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white ${className}`}>
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-[13px] font-semibold text-slate-800">
      {children}
    </h2>
  );
}

interface TeacherDetailProps {
  id: string;
}

export default function TeacherDetail({ id }: TeacherDetailProps) {
  const { data: teacher, isLoading, error } = useTeacherDetail(id);
  const { mutate: updateTeacher, isPending } = useUpdateTeacher();
  const { mutate: createSalary, isPending: isCreatingSalary } = useCreateTeacherSalary();
  const { mutate: updateSalary, isPending: isUpdatingSalary } = useUpdateTeacherSalary();
  const isSavingSalary = isCreatingSalary || isUpdatingSalary;

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<UpdateTeacherInput | null>(null);

  // 급여는 여러 건(PENDING 다건 포함)일 수 있어 리스트로 보여주고,
  // 클릭해서 들어간 개별 레코드만 수정한다.
  const [salaryFormMode, setSalaryFormMode] = useState<"list" | "create" | "edit">("list");
  const [editingSalaryId, setEditingSalaryId] = useState<string | null>(null);
  const [salaryForm, setSalaryForm] = useState<SalaryFormState | null>(null);

  if (isLoading) return <div className="text-sm text-slate-400">불러오는 중...</div>;
  if (error || !teacher)
    return <div className="text-sm text-red-500">강사 정보를 찾을 수 없습니다.</div>;

  function startEdit() {
    if (!teacher) return;
    setForm({
      name: teacher.name,
      phone: teacher.phone,
      status: teacher.status,
      hireDate: teacher.hireDate,
      leaveDate: teacher.leaveDate,
    });
    setIsEditing(true);
  }

  function cancelEdit() {
    setIsEditing(false);
    setForm(null);
  }

  function handleSave() {
    if (!form) return;
    updateTeacher(
      { id, data: form },
      { onSuccess: () => setIsEditing(false) },
    );
  }

  function openCreateSalary() {
    setSalaryForm({ baseSalary: "", bonus: "", paymentDate: "", status: "PENDING" });
    setEditingSalaryId(null);
    setSalaryFormMode("create");
  }

  function openEditSalary(salary: TeacherSalary) {
    setSalaryForm({
      baseSalary: String(salary.baseSalary),
      bonus: String(salary.bonus),
      paymentDate: salary.paymentDate ?? "",
      status: salary.status,
    });
    setEditingSalaryId(salary.id);
    setSalaryFormMode("edit");
  }

  function closeSalaryForm() {
    setSalaryFormMode("list");
    setSalaryForm(null);
    setEditingSalaryId(null);
  }

  function handleSaveSalary() {
    if (!salaryForm) return;
    const payload = {
      baseSalary: Number(salaryForm.baseSalary) || 0,
      bonus: Number(salaryForm.bonus) || 0,
      paymentDate: salaryForm.paymentDate || undefined,
    };

    if (salaryFormMode === "edit" && editingSalaryId) {
      // 리스트에서 클릭해 들어간 그 레코드를 직접 수정 (지급여부 포함)
      updateSalary(
        {
          salaryId: editingSalaryId,
          userId: id,
          data: { ...payload, status: salaryForm.status },
        },
        { onSuccess: closeSalaryForm },
      );
    } else {
      createSalary(
        { userId: id, ...payload },
        { onSuccess: closeSalaryForm },
      );
    }
  }

  return (
    <div className="space-y-5">
      {/* 프로필 카드 */}
      <Card className="p-6">
        {isEditing && form ? (
          <TeacherEditForm
            form={form}
            onChange={setForm}
            onSave={handleSave}
            onCancel={cancelEdit}
            isSaving={isPending}
          />
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-800">{teacher.name}</h1>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${TEACHER_STATUS_STYLE[teacher.status]}`}>
                  {TEACHER_STATUS_LABEL[teacher.status]}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">ID: {teacher.id}</p>
              <p className="mt-1 text-[13px] text-slate-400">
                {teacher.email} · {teacher.phone}
              </p>
            </div>
            <button
              onClick={startEdit}
              className="flex items-center gap-1 rounded border border-slate-200 px-2.5 py-1.5 text-[12px] text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
            >
              <Pencil className="h-3.5 w-3.5" />
              수정
            </button>
          </div>
        )}
      </Card>

      {/* 기본 정보 + 급여 */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <CardTitle>기본 정보</CardTitle>
          <dl className="grid grid-cols-[90px_1fr] gap-y-3 text-[13px]">
            <dt className="text-slate-400">이메일</dt>
            <dd className="text-slate-700">{teacher.email}</dd>
            <dt className="text-slate-400">연락처</dt>
            <dd className="text-slate-700">{teacher.phone}</dd>
            <dt className="text-slate-400">재직상태</dt>
            <dd className="text-slate-700">{TEACHER_STATUS_LABEL[teacher.status]}</dd>
            <dt className="text-slate-400">근무 시작일</dt>
            <dd className="text-slate-700">{teacher.hireDate}</dd>
            <dt className="text-slate-400">퇴사일</dt>
            <dd className="text-slate-700">{teacher.leaveDate ?? "-"}</dd>
          </dl>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-slate-800">
              급여 {salaryFormMode === "list" && `(${teacher.salaries.length})`}
            </h2>
            {salaryFormMode === "list" }
          </div>

          {salaryFormMode !== "list" && salaryForm ? (
            <SalaryEditForm
              form={salaryForm}
              onChange={setSalaryForm}
              onSave={handleSaveSalary}
              onCancel={closeSalaryForm}
              isSaving={isSavingSalary}
              showStatus={salaryFormMode === "edit"}
            />
          ) : teacher.salaries.length === 0 ? (
            <p className="text-[13px] text-slate-400">급여 정보가 없습니다.</p>
          ) : (
            <ul className="space-y-2">
              {teacher.salaries.map((salary) => (
                <li key={salary.id}>
                  <button
                    onClick={() => openEditSalary(salary)}
                    className="w-full rounded border border-slate-200 p-3 text-left transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-slate-800">
                        {formatWon(salary.baseSalary)}
                        {salary.bonus > 0 && (
                          <span className="text-slate-400"> + {formatWon(salary.bonus)}</span>
                        )}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${SALARY_STATUS_STYLE[salary.status]}`}>
                        {SALARY_STATUS_LABEL[salary.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-[11.5px] text-slate-400">
                      지급일 {salary.paymentDate ?? "-"}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* 담당 강좌 */}
      <Card className="p-6">
        <CardTitle>담당 강좌 ({teacher.classes.length})</CardTitle>
        {teacher.classes.length === 0 ? (
          <p className="text-[13px] text-slate-400">담당 중인 강좌가 없습니다.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-400">
                <th className="pb-2.5 font-medium">강좌명</th>
                <th className="pb-2.5 font-medium text-right">수강료</th>
                <th className="pb-2.5 font-medium text-right">원생 수</th>
                <th className="pb-2.5 font-medium text-center">상태</th>
              </tr>
            </thead>
            <tbody>
              {teacher.classes.map((cls) => (
                <tr key={cls.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5 text-slate-700">{cls.name}</td>
                  <td className="py-2.5 text-right text-slate-600">{formatWon(cls.fee)}</td>
                  <td className="py-2.5 text-right text-slate-600">{cls.studentCount}명</td>
                  <td className="py-2.5 text-center text-slate-500">{cls.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* 최근 근태 */}
      <Card className="p-6">
        <CardTitle>최근 근태</CardTitle>
        {teacher.recentAttendance.length === 0 ? (
          <p className="text-[13px] text-slate-400">근태 기록이 없습니다.</p>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-400">
                <th className="pb-2.5 font-medium">날짜</th>
                <th className="pb-2.5 font-medium text-center">출근</th>
                <th className="pb-2.5 font-medium text-center">퇴근</th>
              </tr>
            </thead>
            <tbody>
              {teacher.recentAttendance.map((record) => (
                <tr key={record.workDate} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5 text-slate-700">{record.workDate}</td>
                  <td className="py-2.5 text-center text-slate-600">{record.checkInTime ?? "-"}</td>
                  <td className="py-2.5 text-center text-slate-600">{record.checkOutTime ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}

interface TeacherEditFormProps {
  form: UpdateTeacherInput;
  onChange: (form: UpdateTeacherInput) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

function TeacherEditForm({
  form,
  onChange,
  onSave,
  onCancel,
  isSaving,
}: TeacherEditFormProps) {
  function set<K extends keyof UpdateTeacherInput>(
    key: K,
    value: UpdateTeacherInput[K],
  ) {
    onChange({ ...form, [key]: value });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="이름">
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="h-8 w-full rounded border border-slate-300 px-2.5 text-[12.5px] outline-none focus:border-[#0069A8]"
          />
        </Field>
        <Field label="재직상태">
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value as TeacherStatus)}
            className="h-8 w-full rounded border border-slate-300 px-2.5 text-[12.5px] outline-none focus:border-[#0069A8]"
          >
            {(Object.keys(TEACHER_STATUS_LABEL) as TeacherStatus[]).map(
              (status) => (
                <option key={status} value={status}>
                  {TEACHER_STATUS_LABEL[status]}
                </option>
              ),
            )}
          </select>
        </Field>
        <Field label="연락처">
          <input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            className="h-8 w-full rounded border border-slate-300 px-2.5 text-[12.5px] outline-none focus:border-[#0069A8]"
          />
        </Field>
        <Field label="근무 시작일">
          <input
            type="date"
            value={form.hireDate}
            onChange={(e) => set("hireDate", e.target.value)}
            className="h-8 w-full rounded border border-slate-300 px-2.5 text-[12.5px] outline-none focus:border-[#0069A8]"
          />
        </Field>
        <Field label="퇴사일">
          <input
            type="date"
            value={form.leaveDate ?? ""}
            onChange={(e) => set("leaveDate", e.target.value || null)}
            className="h-8 w-full rounded border border-slate-300 px-2.5 text-[12.5px] outline-none focus:border-[#0069A8]"
          />
        </Field>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="rounded border border-slate-200 px-3 py-1.5 text-[12px] text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          취소
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="rounded bg-[#0069A8] px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[#005a8e] disabled:opacity-50"
        >
          {isSaving ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}

interface SalaryEditFormProps {
  form: SalaryFormState;
  onChange: (form: SalaryFormState) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  // 리스트에서 기존 레코드를 클릭해 들어온 경우에만 지급여부도 함께 수정 가능.
  // 새로 등록하는 경우엔 생성 API가 지급여부를 안 받으므로 숨긴다.
  showStatus: boolean;
}

function SalaryEditForm({
  form,
  onChange,
  onSave,
  onCancel,
  isSaving,
  showStatus,
}: SalaryEditFormProps) {
  function set<K extends keyof SalaryFormState>(key: K, value: SalaryFormState[K]) {
    onChange({ ...form, [key]: value });
  }

  return (
    <div className="space-y-3">
      <Field label="기본급">
        <input
          type="number"
          value={form.baseSalary}
          onChange={(e) => set("baseSalary", e.target.value)}
          className="h-8 w-full rounded border border-slate-300 px-2.5 text-[12.5px] outline-none focus:border-[#0069A8]"
        />
      </Field>
      <Field label="보너스">
        <input
          type="number"
          value={form.bonus}
          onChange={(e) => set("bonus", e.target.value)}
          className="h-8 w-full rounded border border-slate-300 px-2.5 text-[12.5px] outline-none focus:border-[#0069A8]"
        />
      </Field>
      <Field label="지급일">
        <input
          type="date"
          value={form.paymentDate}
          onChange={(e) => set("paymentDate", e.target.value)}
          className="h-8 w-full rounded border border-slate-300 px-2.5 text-[12.5px] outline-none focus:border-[#0069A8]"
        />
      </Field>
      {showStatus && (
        <Field label="지급 여부">
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value as SalaryStatus)}
            className="h-8 w-full rounded border border-slate-300 px-2.5 text-[12.5px] outline-none focus:border-[#0069A8]"
          >
            <option value="PENDING">지급 대기</option>
            <option value="COMPLETED">지급 완료</option>
          </select>
        </Field>
      )}

      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="rounded border border-slate-200 px-3 py-1.5 text-[12px] text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          취소
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="rounded bg-[#0069A8] px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-[#005a8e] disabled:opacity-50"
        >
          {isSaving ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11.5px] text-slate-400">{label}</span>
      {children}
    </label>
  );
}
