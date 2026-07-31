"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ModalProvider from "@/shared/components/ModalProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          retry: 2,
        },
      },
    });
    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ModalProvider />
      <Toaster />
      {process.env.NEXT_PUBLIC_NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
