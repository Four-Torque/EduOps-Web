"use client";

import CreateVendorDialog from "@/features/vendor/components/CreateVendorDialog";
import EditVendorDialog from "@/features/vendor/components/EditVendorDialog";
import CreateAssetApplicationDialog from "@/features/asset/components/CreateAssetApplicationDialog";
import RejectAssetApplicationDialog from "@/features/asset/components/RejectAssetApplicationDialog";
import TeacherDetailModal from "@/features/user/components/TeacherDetailModal";
import CreateUserDialog from "@/features/user/components/CreateUserDialog";
import EditUserDialog from "@/features/user/components/EditUserDialog";
import CreateStudentDialog from "@/features/student/components/CreateStudentDialog";
import EditStudentDialog from "@/features/student/components/EditStudentDialog";
import CreateScheduleDialog from "@/features/schedule/components/CreateScheduleDialog";
import { CreateAttendanceRecordDialog } from "@/features/attendance/components/CreateAttendanceRecordDialog";

export default function ModalProvider() {
  return (
    <>
      <CreateAssetApplicationDialog />
      <RejectAssetApplicationDialog />
      <CreateVendorDialog />
      <EditVendorDialog />
      <TeacherDetailModal />
      <CreateUserDialog />
      <EditUserDialog />
      <CreateStudentDialog />
      <EditStudentDialog />
      <CreateScheduleDialog />
      <CreateAttendanceRecordDialog />
    </>
  );
}
