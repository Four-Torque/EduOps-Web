"use client";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useScheduleStore } from "../store";
import { useCreateScheduleBulk } from "../query";
import ScheduleForm from "./form/ScheduleForm";

export default function CreateScheduleDialog() {
  const { isCreateOpen, onCreateClose } = useScheduleStore();
  const { mutate: createBulk, isPending } = useCreateScheduleBulk();

  const defaultValues = {
    classId: "",
    dayOfWeek: 1,
    startTime: "14:00",
    endTime: "15:30",
    room: "",
  };

  const onSubmit = (values: any) => {
    const payload = {
      classId: values.classId,
      schedules: [
        {
          dayOfWeek: values.dayOfWeek,
          startTime: values.startTime,
          endTime: values.endTime,
          room: values.room,
        },
      ],
    };

    createBulk(payload, {
      onSuccess: () => {
        onCreateClose();
      },
    });
  };

  return (
    <Dialog open={isCreateOpen} onOpenChange={onCreateClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">시간표 등록</DialogTitle>
        </DialogHeader>
        <ScheduleForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
