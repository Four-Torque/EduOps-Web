"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-1">
      <PaginationButton
        label="‹"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />
      {pages.map((page) => (
        <PaginationButton
          key={page}
          label={String(page)}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        />
      ))}
      <PaginationButton
        label="›"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}

interface PaginationButtonProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

function PaginationButton({ label, active, disabled, onClick }: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-[26px] h-[26px] rounded border text-[11.5px] flex items-center justify-center transition-colors",
        active
          ? "bg-[#0069A8] text-white border-[#0069A8] font-bold"
          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50",
        disabled ? "opacity-40 pointer-events-none" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}