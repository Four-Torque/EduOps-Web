"use client";

import { useSession } from "@/hooks/user/useSession";

export default function RootPage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Root Page</h1>
      <p>Welcome, {session?.name}!</p>
      <p>Your email: {session?.email}</p>
      <p>Your phone: {session?.phone}</p>
      <p>Your role: {session?.role}</p>
    </div>
  );
}
