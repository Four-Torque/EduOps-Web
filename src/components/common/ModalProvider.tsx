"use client";

import CreateAssetApplicationDialog from "../asset/CreateAssetApplicationDialog";
import RejectAssetApplicationDialog from "../asset/RejectAssetApplicationDialog";

export default function ModalProvider() {
  return (
    <>
      <CreateAssetApplicationDialog />
      <RejectAssetApplicationDialog />
    </>
  );
}
