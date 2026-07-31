import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { BlockList } from "net";

interface SubmitButtonProps {
  title: string;
  className?: string;
  disabled? : boolean;
}
export default function SubmitButton({ title, className, disabled }: SubmitButtonProps) {
  return (
    <Button
      disabled={disabled}
      className={cn(
        "size-full mt-6 p-3.75 text-white border-none rounded-[7px] text-[16px] font-bold cursor-pointer tracking-[0.5px] transition-colors duration-180",
        className,
      )}
      type="submit"
    >
      {title}
    </Button>
  );
}
