import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { uploadClassFile } from "./api";

export interface FileMetadata {
  url: string;
  originalName: string;
  size: number;
}

export function useDocumentUpload() {
  const [file, setFile] = useState<FileMetadata | null>(null);
  const [uploading, setUploading] = useState(false);

  const upload = useCallback(async (selectedFile: File) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("files", selectedFile);

      const response = await uploadClassFile(formData);

      const uploadedUrls: string[] = response?.body ?? [];

      if (uploadedUrls.length > 0) {
        uploadedUrls.forEach((url) => {
          const fileData: FileMetadata = {
            url,
            originalName: selectedFile.name,
            size: selectedFile.size,
          };

          setFile(fileData);
          return fileData;
        });
      }
    } catch (error) {
      toast.error("파일 업로드 실패");
      throw error;
    } finally {
      setUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setUploading(false);
  }, []);

  return {
    file,
    uploading,
    upload,
    reset,
  };
}
