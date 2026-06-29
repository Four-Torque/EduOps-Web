import { Input } from "../ui/input";

interface FormInputProps {
  type: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  ariaInvalid?: boolean;
  id?: string;
  placeholder?: string;
  autoComplete?: string;
}

export default function FormInput({
  type,
  icon: Icon,
  ariaInvalid,
  id,
  placeholder,
  autoComplete,
  ...field
}: FormInputProps) {
  return (
    <div
      aria-invalid={ariaInvalid}
      className="relative flex items-center border border-[#dfe1e6] rounded-md focus-within:ring-0.5 focus-within:ring-[#2255b8] focus-within:border-[#2255b8] focus-within:shadow-[0_0_0_3px_rgba(34,85,184,0.1)] aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
    >
      {Icon && (
        <Icon className="absolute left-3.25 top-3 size-4.25 text-[#9aa3b5]" />
      )}
      <Input
        id={id}
        type={type}
        aria-invalid={ariaInvalid}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="py-3.25 pl-10 pr-3.5 h-10.75 text-sm transition-colors duration-180 border-none focus-visible:ring-0 focus-visible:ring-offset-0 aria-invalid:border-none aria-invalid:ring-0 aria-invalid:text-foreground"
        {...field}
      />
    </div>
  );
}
