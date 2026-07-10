"use client";

import CreateVendorDialog from "@/features/vendor/components/CreateVendorDialog";
import EditVendorDialog from "@/features/vendor/components/EditVendorDialog";
import CreateAssetApplicationDialog from "@/features/asset/components/CreateAssetApplicationDialog";
import RejectAssetApplicationDialog from "@/features/asset/components/RejectAssetApplicationDialog";
import TeacherDetailModal from "@/features/user/components/TeacherDetailModal";

export default function ModalProvider() {
  return (
    <>
      <CreateAssetApplicationDialog />
      <RejectAssetApplicationDialog />
      <CreateVendorDialog />
      <EditVendorDialog />
      <TeacherDetailModal />
    </>
  );
}
