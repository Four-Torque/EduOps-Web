import { Input } from "@/shared/components/ui/input";
import { useAcademyInfoStore } from "@/features/academy/store";
import type { AcademyBasicInfo } from "@/features/academy/type";

interface AcademyInputFieldProps {
  label: string;
  fieldKey: keyof AcademyBasicInfo;
  value: string;
  placeholder?: string;
  fullWidth?: boolean;
}

export function AcademyInputField({
  label,
  fieldKey,
  value,
  placeholder,
  fullWidth = false,
}: AcademyInputFieldProps) {
  const { setEditField } = useAcademyInfoStore();

  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <label className="block text-[12px] font-medium text-slate-600 mb-1.5">
        {label}
      </label>
      <Input
        value={value}
        onChange={(e) => setEditField(fieldKey, e.target.value)}
        placeholder={placeholder}
        className="text-[12.5px]"
      />
    </div>
  );
}
