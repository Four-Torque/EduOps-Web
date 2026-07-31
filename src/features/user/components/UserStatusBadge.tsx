import {
  USER_STATUS_STYLE,
  USER_STATUS_LABEL,
} from "@/shared/constants/director/user.constants";
import { UserApprovalStatus } from "../type";

interface UserStatusBadgeProps {
  status: UserApprovalStatus;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  readonly?: boolean;
}

export function UserStatusBadge({
  status,
  onClick,
  readonly,
}: UserStatusBadgeProps) {
  const base =
    "inline-block text-[10.5px] font-medium px-3 py-1 rounded transition-colors";

  if (readonly) {
    return (
      <span className={`${base} ${USER_STATUS_STYLE[status]}`}>
        {USER_STATUS_LABEL[status]}
      </span>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${USER_STATUS_STYLE[status]} cursor-pointer`}
    >
      {USER_STATUS_LABEL[status]}
    </button>
  );
}
