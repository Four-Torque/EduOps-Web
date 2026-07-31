import { Icon as LucideIcon, LucideProps } from "lucide-react";

export type Icon = typeof LucideIcon;

export const Icon = {
  logo: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 2 2.686 3 6 3s6-1 6-3v-5" />
      <line x1="22" y1="10" x2="22" y2="15" />
    </svg>
  ),
};
