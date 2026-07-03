"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const SIZE_CLASS = {
  sm: "sm:max-w-md",
  md: "sm:max-w-xl",
  lg: "sm:max-w-3xl",
} as const;

interface CardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  size?: keyof typeof SIZE_CLASS;
  footer?: React.ReactNode;
  children: React.ReactNode;
  bodyClassName?: string;
}

// 공통 카드 모달. ui/dialog(Radix)를 감싸 헤더/본문(스크롤)/푸터 레이아웃을 제공한다.
export function CardModal({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  footer,
  children,
  bodyClassName,
}: CardModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(SIZE_CLASS[size], "flex max-h-[85vh] flex-col gap-0 overflow-hidden p-0")}
      >
        {(title || description) && (
          <DialogHeader className="border-b border-slate-100 px-6 pt-6 pb-4">
            {title && <DialogTitle className="text-base">{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        <div className={cn("flex-1 overflow-y-auto px-6 py-5", bodyClassName)}>
          {children}
        </div>

        {footer && (
          <DialogFooter className="border-t border-slate-100 px-6 py-4">{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}