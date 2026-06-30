import { USER_STATUS_LABEL, USER_STATUS_STYLE } from "@/constants/director/user.constants";
import type { UserApprovalStatus } from "@/types/director/user.types";

interface UserStatusBadgeProps {
  status: UserApprovalStatus;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly?: boolean;
}

export function UserStatusBadge({ status, onClick, readonly }: UserStatusBadgeProps) {
  const base = "inline-block text-[10.5px] font-medium px-3 py-1 rounded transition-colors";

  if (readonly) {
    return (
      <span className={`${base} ${USER_STATUS_STYLE[status]}`}>
        {USER_STATUS_LABEL[status]}
      </span>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${USER_STATUS_STYLE[status]} cursor-pointer`}>
      {USER_STATUS_LABEL[status]}
    </button>
  );
}
