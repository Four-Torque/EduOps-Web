import toast from "react-hot-toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { documentUpload } from "./api";

interface Props {
  maxDocuments?: number;
  onSuccess?: (urls: string[], names: string[]) => void;
  initialDocuments?: string[];
  initialNames?: string[];
}

export function useDocumentUpload({
  maxDocuments = 1,
  onSuccess,
  initialDocuments = [],
  initialNames = [],
}: Props = {}) {
  const [documents, setDocuments] = useState<string[]>(initialDocuments);
  const [names, setNames] = useState<string[]>(initialNames);
  const [uploading, setUploading] = useState(false);
  const prevInitialDocumentsRef = useRef<string[]>(initialDocuments);

  useEffect(() => {
    const currentInitialDocuments = initialDocuments;
    const prevInitialDocuments = prevInitialDocumentsRef.current;

    const hasChanged =
      currentInitialDocuments.length !== prevInitialDocuments.length ||
      currentInitialDocuments.some(
        (doc, index) => doc !== prevInitialDocuments[index],
      );

    if (hasChanged) {
      setDocuments(currentInitialDocuments);
      setNames(initialNames);
      prevInitialDocumentsRef.current = currentInitialDocuments;
    }
  }, [initialDocuments, initialNames]);

  const uploadDocuments = useCallback(
    async (acceptedFiles: File[]) => {
      const remainingSlots = maxDocuments - documents.length;
      const filesToUpload = acceptedFiles.slice(0, maxDocuments);
      if (filesToUpload.length === 0) {
        toast.error("업로드할 파일을 선택해주세요.");
        return;
      }
      setUploading(true);
      try {
        const formData = new FormData();
        const fileNames: string[] = [];

        filesToUpload.forEach((file) => {
          formData.append("files", file);
          fileNames.push(file.name);
        });
        console.log("formData: ", formData);

        const uploadedUrls = await documentUpload(formData);
        console.log("2");

        if (uploadedUrls && uploadedUrls.length > 0) {
          let newDocuments: string[];
          let newNames: string[];

          if (remainingSlots <= 0) {
            newDocuments = uploadedUrls.slice(0, maxDocuments);
            newNames = fileNames.slice(0, maxDocuments);
          } else {
            const totalDocuments = [...documents, ...uploadedUrls];
            const totalNames = [...names, ...fileNames];
            newDocuments = totalDocuments.slice(0, maxDocuments);
            newNames = totalNames.slice(0, maxDocuments);
          }

          setDocuments(newDocuments);
          setNames(newNames);
          onSuccess?.(newDocuments, newNames);
        }
      } catch (error) {
        toast.error("파일 업로드 실패");
      } finally {
        setUploading(false);
      }
    },
    [documents, names, maxDocuments, onSuccess],
  );

  return {
    uploading,
    uploadDocuments,
    names,
  };
}

export function extractFileName(url: string | null | undefined) {
  if (!url) return "";
  const pathPart = url.split("?")[0];
  const parts = pathPart.split("/");
  return parts[parts.length - 1] || "";
}
