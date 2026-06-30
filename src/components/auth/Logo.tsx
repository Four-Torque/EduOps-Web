import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Icon as LogoIcon } from "@/components/ui/icon";

interface LogoProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  bgColor?: string;
  textColor?: string;
}

export default function Logo({
  icon: Icon,
  title,
  description,
  bgColor,
  textColor,
}: LogoProps) {
  return (
    <div className="flex flex-col items-center mb-7">
      <div
        className={`size-16 bg-[${bgColor}] rounded-2xl flex items-center justify-center mb-4.5`}
      >
        {Icon ? (
          <Icon className={`size-8.5 text-[${textColor}]`} />
        ) : (
          <LogoIcon.logo className={`size-8.5 text-[${textColor}]`} />
        )}
      </div>
      <h1
        className={cn(
          "text-[24px] text-[#1a3a6b] mb-1.5",
          title ? "font-semibold" : "font-bold",
        )}
      >
        {title || "EduOps"}
      </h1>
      <p className="text-[13.5px] text-[#7a8399]">
        {description || "학원 경영을 위한 스마트한 첫 걸음"}
      </p>
    </div>
  );
}
