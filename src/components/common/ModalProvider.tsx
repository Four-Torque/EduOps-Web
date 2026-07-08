"use client";

import CreateAssetApplicationDialog from "../asset/CreateAssetApplicationDialog";
import RejectAssetApplicationDialog from "../asset/RejectAssetApplicationDialog";
import CreateVendorDialog from "../manager/vendor/CreateVendorDialog";
import EditVendorDialog from "../manager/vendor/EditVendorDialog";

export default function ModalProvider() {
  return (
    <>
      <CreateAssetApplicationDialog />
      <RejectAssetApplicationDialog />
      <CreateVendorDialog />
      <EditVendorDialog />
    </>
  );
}
