"use client";

import { useState } from "react";
import { CardModal } from "@/shared/components/CardModal";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { ClassSyllabusItem } from "../type";
import { useApproveSyllabus, useRejectSyllabus } from "../query";
import { toast } from "react-hot-toast";

interface SyllabusDetailModalProps {
  item: ClassSyllabusItem | null;
  onClose: () => void;
  isManager?: boolean;
}

const getStatusBadgeStyle = (status: string) => {
  if (status === "APPROVED") return "bg-green-100 text-green-700";
  if (status === "REJECTED") return "bg-red-100 text-red-700";
  return "bg-orange-100 text-orange-700"; // PENDING
};

const getStatusText = (status: string) => {
  if (status === "APPROVED") return "승인됨";
  if (status === "REJECTED") return "반려됨";
  return "대기 중";
};

export function SyllabusDetailModal({ item, onClose, isManager = false }: SyllabusDetailModalProps) {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  
  const approveMutation = useApproveSyllabus();
  const rejectMutation = useRejectSyllabus();

  if (!item) return null;

  const handleApprove = () => {
    approveMutation.mutate(item.id, {
      onSuccess: () => {
        toast.success("강좌계획서가 승인되었으며 강좌가 생성되었습니다.");
        onClose();
      },
      onError: () => toast.error("승인 중 오류가 발생했습니다."),
    });
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error("반려 사유를 입력해주세요.");
      return;
    }
    rejectMutation.mutate({ id: item.id, rejectedReason: rejectReason }, {
      onSuccess: () => {
        toast.success("강좌계획서가 반려되었습니다.");
        setIsRejecting(false);
        setRejectReason("");
        onClose();
      },
      onError: () => toast.error("반려 중 오류가 발생했습니다."),
    });
  };

  const handleClose = () => {
    setIsRejecting(false);
    setRejectReason("");
    onClose();
  };

  const renderFooter = () => {
    if (isManager && item.status === "PENDING") {
      if (isRejecting) {
        return (
          <div className="flex w-full flex-col gap-3">
            <Textarea 
              placeholder="반려 사유를 입력하세요" 
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRejecting(false)}>취소</Button>
              <Button variant="destructive" onClick={handleReject} disabled={rejectMutation.isPending}>
                {rejectMutation.isPending ? "처리 중..." : "반려 확정"}
              </Button>
            </div>
          </div>
        );
      }

      return (
        <div className="flex justify-between w-full">
          <Button variant="outline" onClick={handleClose}>닫기</Button>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => setIsRejecting(true)}>반려</Button>
            <Button onClick={handleApprove} disabled={approveMutation.isPending}>
              {approveMutation.isPending ? "승인 중..." : "승인 (강좌 생성)"}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Button onClick={handleClose} variant="outline">
        닫기
      </Button>
    );
  };

  return (
    <CardModal
      open={!!item}
      onOpenChange={(isOpen) => !isOpen && handleClose()}
      title="강의계획서 상세 정보"
      description={isManager ? "강좌계획서를 검토하고 승인 또는 반려합니다." : "제출한 강의계획서의 세부 내용을 확인합니다."}
      size="lg"
      footer={renderFooter()}
    >
      <div className="flex flex-col gap-6 py-2">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div>
            <p className="text-sm text-slate-500 mb-1">상태</p>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(item.status)}`}>
              {getStatusText(item.status)}
            </span>
          </div>
          {item.status === "REJECTED" && item.rejectedReason && (
            <div className="text-right flex-1 ml-6">
              <p className="text-sm text-slate-500 mb-1">반려 사유</p>
              <p className="text-sm text-red-600 font-medium break-keep">{item.rejectedReason}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">강좌명</Label>
            <p className="text-base text-slate-900 font-medium">{item.name}</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">수강료</Label>
            <p className="text-sm text-slate-800">{item.fee.toLocaleString()} 원</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">정원</Label>
            <p className="text-sm text-slate-800">{item.capacity} 명</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">예정 기간</Label>
            <p className="text-sm text-slate-800">
              {item.startDate ? item.startDate.split("T")[0] : "?"} ~{" "}
              {item.endDate ? item.endDate.split("T")[0] : "?"}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">수강 대상</Label>
            <p className="text-sm text-slate-800">{item.targetAudience || "-"}</p>
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">강의 설명</Label>
            <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 whitespace-pre-wrap min-h-[60px]">
              {item.description || "내용 없음"}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 col-span-2">
            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">커리큘럼 세부 내용</Label>
            <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 whitespace-pre-wrap min-h-[100px]">
              {item.curriculum || "내용 없음"}
            </div>
          </div>
        </div>
      </div>
    </CardModal>
  );
}
