"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAttendanceStore } from "@/features/attendance/store";
import { useFindUsers } from "@/features/user/query";
import { useStaffCheckIn, useStaffCheckOut } from "@/features/attendance/query";
import {
  attendanceRecordSchema,
  AttendanceRecordFormValues,
} from "@/features/attendance/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import toast from "react-hot-toast";

import type { User } from "@/features/user/type";

export function CreateAttendanceRecordDialog() {
  const { isRecordOpen, onRecordClose } = useAttendanceStore();
  const { data: userData } = useFindUsers(
    { limit: "100" },
    { enabled: isRecordOpen },
  );

  const { mutateAsync: checkIn } = useStaffCheckIn();
  const { mutateAsync: checkOut } = useStaffCheckOut();

  const staffMembers = ((userData as any)?.data ?? []).filter(
    (u: User) =>
      u.role === "TEACHER" || u.role === "MANAGER" || u.role === "DIRECTOR",
  ) as User[];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AttendanceRecordFormValues>({
    resolver: zodResolver(attendanceRecordSchema),
    defaultValues: {
      userId: "",
      workDate: new Date().toISOString().split("T")[0],
      checkInTime: "09:00",
      checkOutTime: "",
    },
  });

  const selectedUserId = watch("userId");

  const onSubmit = async (values: AttendanceRecordFormValues) => {
    try {
      const { userId, workDate, checkInTime, checkOutTime } = values;

      if (checkInTime) {
        const checkInDate = new Date(`${workDate}T${checkInTime}:00`);
        await checkIn({
          userId,
          workDate,
          checkInTime: checkInDate,
        } as any);
      }

      if (checkOutTime) {
        await checkOut({
          userId,
          workDate,
        } as any);
      }

      toast.success("근태 기록이 성공적으로 등록되었습니다.");
      reset();
      onRecordClose();
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "근태 등록 중 오류가 발생했습니다.";
      toast.error(msg);
    }
  };

  return (
    <Dialog open={isRecordOpen} onOpenChange={onRecordClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[16px] font-semibold text-slate-900">
            근태 직접 기록
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
          {/* 직원 선택 */}
          <div className="space-y-1.5">
            <Label className="text-[12.5px] font-medium text-slate-700">
              직원 선택
            </Label>
            <Select
              value={selectedUserId}
              onValueChange={(val) =>
                setValue("userId", val, { shouldValidate: true })
              }
            >
              <SelectTrigger className="w-full text-[12.5px]">
                <SelectValue placeholder="직원을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {staffMembers.map((member) => (
                  <SelectItem
                    key={member.id}
                    value={member.id}
                    className="text-[12.5px]"
                  >
                    {member.name} (
                    {member.role === "TEACHER" ? "강사" : "관리자"})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.userId && (
              <p className="text-[11px] text-red-500">
                {errors.userId.message}
              </p>
            )}
          </div>

          {/* 날짜 선택 */}
          <div className="space-y-1.5">
            <Label className="text-[12.5px] font-medium text-slate-700">
              근무 날짜
            </Label>
            <Input
              type="date"
              className="text-[12.5px]"
              {...register("workDate")}
            />
            {errors.workDate && (
              <p className="text-[11px] text-red-500">
                {errors.workDate.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 출근 시각 */}
            <div className="space-y-1.5">
              <Label className="text-[12.5px] font-medium text-slate-700">
                출근 시각 (선택)
              </Label>
              <Input
                type="time"
                className="text-[12.5px]"
                {...register("checkInTime")}
              />
            </div>

            {/* 퇴근 시각 */}
            <div className="space-y-1.5">
              <Label className="text-[12.5px] font-medium text-slate-700">
                퇴근 시각 (선택)
              </Label>
              <Input
                type="time"
                className="text-[12.5px]"
                {...register("checkOutTime")}
              />
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex items-center justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onRecordClose}
              className="text-[12.5px]"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSubmitting}
              className="text-[12.5px]"
            >
              {isSubmitting ? "등록 중..." : "등록"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
