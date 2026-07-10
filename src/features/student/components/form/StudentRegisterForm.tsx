"use client";

import { FieldGroup } from "@/shared/components/ui/field";
import { StudentInputField }  from "./StudentInputField";
import { StudentSelectField } from "./StudentSelectField";
import { AddressField }       from "@/shared/components/field/AddressField";
import { useStudentRegisterStore } from "@/features/student/store";
import { useQueryClient }          from "@tanstack/react-query";
import { studentQueryKeys }        from "@/features/student/query";
import { STUDENT_STATUS_OPTIONS }  from "@/shared/constants/manager/student-register.constants";
import type { StudentRegisterFormState } from "@/features/student/type";
import SubmitButton from "@/shared/components/SubmitButton";

function validateForm(form: StudentRegisterFormState) {
  const errors: Partial<Record<keyof StudentRegisterFormState, string>> = {};
  if (!form.name.trim())      errors.name      = "이름을 입력해주세요.";
  if (!form.birthDate.trim()) errors.birthDate = "생년월일을 입력해주세요.";
  if (!form.phone.trim())     errors.phone     = "핸드폰 번호를 입력해주세요.";
  if (!form.address.trim())   errors.address   = "주소를 입력해주세요.";
  return errors;
}

export function StudentRegisterForm() {
  const { form, errors, editingId, closeModal, setField, setErrors } = useStudentRegisterStore();
  const queryClient = useQueryClient();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // TODO: API 연동
    queryClient.invalidateQueries({ queryKey: studentQueryKeys.all() });
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <StudentInputField label="이름"       fieldKey="name"      placeholder="김민주"        />
        <StudentInputField label="생년월일"    fieldKey="birthDate" type="date"                />
        <StudentInputField label="핸드폰 번호" fieldKey="phone"     placeholder="010-1234-5678" />
        <AddressField
          address={form.address}
          addressDetail={form.addressDetail}
          onAddressChange={(v) => setField("address", v)}
          onAddressDetailChange={(v) => setField("addressDetail", v)}
          error={errors.address}
        />
        <StudentSelectField label="상태" fieldKey="status" options={STUDENT_STATUS_OPTIONS} />
        <SubmitButton title={editingId ? "수정" : "등록"} />
      </FieldGroup>
    </form>
  );
}