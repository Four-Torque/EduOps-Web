"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  MOCK_CLASS_OPTIONS,
  STUDENT_STATUS_OPTIONS,
} from "@/shared/constants/manager/student-register.constants";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/components/ui/select";
import {} from "radix-ui";
import { useStudentRegisterStore } from "../store";
import { StudentRegisterFormState } from "../type";

function validateForm(form: StudentRegisterFormState) {
  const errors: Record<string, string> = {};

  if (!form.name.trim()) errors.name = "이름을 입력해주세요.";
  if (!form.birthDate.trim()) errors.birthDate = "생년월일을 입력해주세요.";
  if (!form.phone.trim()) errors.phone = "핸드폰 번호를 입력해주세요.";
  if (!form.grade.trim()) errors.grade = "학년을 입력해주세요.";
  if (!form.classId) errors.classId = "수업을 선택해주세요.";

  return errors;
}

export function StudentRegisterModal() {
  const { isModalOpen, form, errors, closeModal, setField, setErrors } =
    useStudentRegisterStore();
  // const { mutate: register, isPending } = useRegisterStudent();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  if (!isModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // register(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-[420px] overflow-hidden"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-[14px] font-semibold text-slate-800">
            학생 등록
          </h2>
          <button
            onClick={closeModal}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="px-5 py-4">
          <div className="flex flex-col gap-4">
            {/* 이름 */}
            <FormField label="이름" error={errors.name}>
              <Input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="김민주"
                className="text-[12.5px]"
              />
            </FormField>

            {/* 생년월일 + 학년 */}
            <div className="grid grid-cols-2 gap-3">
              <FormField label="생년월일" error={errors.birthDate}>
                <Input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => setField("birthDate", e.target.value)}
                  className="text-[12.5px]"
                />
              </FormField>

              <FormField label="학년" error={errors.grade}>
                <Input
                  value={form.grade}
                  onChange={(e) => setField("grade", e.target.value)}
                  placeholder="예: 3년"
                  className="text-[12.5px]"
                />
              </FormField>
            </div>

            {/* 핸드폰 번호 */}
            <FormField label="핸드폰 번호" error={errors.phone}>
              <Input
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="010-1234-5678"
                className="text-[12.5px]"
              />
            </FormField>

            {/* 수업명 Select */}
            <FormField label="수업명" error={errors.classId}>
              <Select
                value={form.classId}
                onValueChange={(value) => setField("classId", value)}
              >
                <SelectTrigger className="w-full text-[12.5px]" size="default">
                  <SelectValue placeholder="수업을 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CLASS_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.id}
                      value={option.id}
                      className="text-[12.5px]"
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            {/* 상태 Select */}
            <FormField label="상태">
              <Select
                value={form.status}
                onValueChange={(value) => setField("status", value)}
              >
                <SelectTrigger className="w-full text-[12.5px]" size="default">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STUDENT_STATUS_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-[12.5px]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-2 mt-5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={closeModal}
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              // disabled={isPending}
            >
              {/* {isPending ? "등록 중..." : "등록"} */}
              등록
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
