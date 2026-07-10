import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { useStudentRegisterStore } from "@/features/student/store";
import type { StudentRegisterFormState } from "@/features/student/type";

interface StudentInputFieldProps {
  label: string;
  fieldKey: keyof StudentRegisterFormState;
  placeholder?: string;
  type?: string;
}

export function StudentInputField({
  label,
  fieldKey,
  placeholder,
  type = "text",
}: StudentInputFieldProps) {
  const { form, errors, setField } = useStudentRegisterStore();

  return (
    <Field className="gap-2">
      <FieldLabel htmlFor={fieldKey} className="font-semibold">
        {label}
      </FieldLabel>
      <Input
        id={fieldKey}
        type={type}
        value={form[fieldKey] as string}
        onChange={(e) => setField(fieldKey, e.target.value)}
        placeholder={placeholder}
      />
      {errors[fieldKey] && (
        <FieldError errors={[{ message: errors[fieldKey]! }]} />
      )}
    </Field>
  );
}
