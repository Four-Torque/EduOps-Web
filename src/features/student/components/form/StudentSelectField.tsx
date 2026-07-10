import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useStudentRegisterStore } from "@/features/student/store";
import type { StudentRegisterFormState } from "@/features/student/type";

interface SelectOption {
  label: string;
  value: string;
}

interface StudentSelectFieldProps {
  label: string;
  fieldKey: keyof StudentRegisterFormState;
  options: SelectOption[];
  placeholder?: string;
}

export function StudentSelectField({
  label,
  fieldKey,
  options,
  placeholder,
}: StudentSelectFieldProps) {
  const { form, errors, setField } = useStudentRegisterStore();

  return (
    <Field className="gap-2">
      <FieldLabel htmlFor={fieldKey} className="font-semibold">
        {label}
      </FieldLabel>
      <Select
        value={form[fieldKey] as string}
        onValueChange={(v) => setField(fieldKey, v)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors[fieldKey] && (
        <FieldError errors={[{ message: errors[fieldKey]! }]} />
      )}
    </Field>
  );
}
