import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  title: string;
}

export default function SubmitButton({ title }: SubmitButtonProps) {
  return (
    <Button
      className="size-full mt-6 p-3.75 text-white border-none rounded-[7px] text-[16px] font-bold cursor-pointer tracking-[0.5px] transition-colors duration-180"
      type="submit"
    >
      {title}
    </Button>
  );
}
