"use client";

import { useState } from "react";
import { useClasses } from "@/features/class/query";
import { ClassCard } from "./ClassCard";
import { Button } from "@/shared/components/ui/button";
import { Plus, LayoutGrid, List } from "lucide-react";
import { CreateClassModal } from "./CreateClassModal";

export function ClassGrid() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { data, isLoading } = useClasses({ limit: 100 });
  const items = data?.data || [];

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.teacherName?.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 w-full bg-white border border-slate-200 rounded p-1">
          <input
            className="flex-1 px-3 py-1 text-sm text-slate-800 outline-none placeholder:text-slate-400 bg-transparent"
            placeholder="강좌명, 강사명으로 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <div className="flex items-center ml-2 border-l border-slate-200 pl-2 gap-1">
            <button
              className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:bg-slate-50"}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-slate-100 text-slate-700" : "text-slate-400 hover:bg-slate-50"}`}
              onClick={() => setViewMode("list")}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-[10%] bg-slate-800 hover:bg-slate-700 text-white gap-1"
        >
          <Plus />
          추가
        </Button>
      </div>

      {isLoading ? (
        <div className="py-12 flex justify-center items-center">
          <p className="text-slate-400 text-sm">강좌를 불러오는 중입니다...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-12 flex justify-center items-center border border-dashed border-slate-200 rounded-lg bg-slate-50">
          <p className="text-slate-400 text-sm">조건에 맞는 강좌가 없습니다.</p>
        </div>
      ) : (
        <div
          className={`grid gap-5 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"}`}
        >
          {filteredItems.map((item) => (
            <ClassCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <CreateClassModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
