import { MessageContainer } from "@/components/director/message/MessageContainer";

export default function DirectorMessagePage() {
  return (
    <div className="h-[calc(100vh-theme(spacing.24))]">
      <MessageContainer />
    </div>
  );
}
