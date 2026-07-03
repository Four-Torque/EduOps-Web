"use client";

import { Pencil, MoreVertical,Trash2 } from "lucide-react";
import { StudentStatusBadge } from "./StudentStatusBadge";
import { StudentSearchBar }   from "./StudentSearchBar";
import { Pagination }         from "@/components/common/Pagination";
import { STUDENT_TABLE_COLUMNS, MOCK_STUDENT_STATS } from "@/constants/manager/student.constants";
import { StudentStatsCards }    from "./StudentStatsCards";
import { StudentRegisterModal } from "./StudentRegisterModal";
import { useStudentStore }      from "@/store/manager/student.store";
import { useStudents }          from "@/hooks/manager/student.hooks";
import { useStudentRegisterStore } from "@/store/manager/student-register.store";
import type { Student }         from "@/types/manager/student.types";

export function StudentTable() {
  const {
    tab, searchQuery, page, selectedIds,
    setTab, setSearchQuery, setPage,
    toggleSelect, toggleSelectAll,
  } = useStudentStore();

const { openModal } = useStudentRegisterStore();

  const { data, isLoading } = useStudents();

  const items      = (data?.items      ?? []) as Student[];
  const totalItems = data?.totalItems ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const allChecked = items.length > 0 && items.every((s: Student) => selectedIds.includes(s.id));

  return (
    <div>
      {/* 헤더 + 학생 등록 버튼 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[18px] font-bold text-slate-900">학생 관리</h1>
        <button
           onClick={() => openModal()} 
          className="text-[11.5px] font-medium text-white bg-[#0069A8] px-3 py-1.5 rounded hover:bg-[#005a8e] transition-colors"
        >
          + 학생 등록
        </button>
      </div>

      {/* 통계 카드 */}
      <StudentStatsCards stats={MOCK_STUDENT_STATS} />

      <div className="border border-slate-200 rounded">
        {/* 탭 */}
        {/* 검색 + 필터 + Export */}
        <StudentSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* 테이블 */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-y border-slate-200 bg-[#f5f6f8]">
              <th className="px-3.5 py-[9px] w-10">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={() => toggleSelectAll(items.map((s: Student) => s.id))}
                  className="w-3.5 h-3.5 accent-[#0069A8]"
                />
              </th>
              {STUDENT_TABLE_COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className="px-3.5 py-[9px] text-[11.5px] font-semibold text-slate-500 text-left"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="px-3.5 py-8 text-center text-[12px] text-slate-400">
                  불러오는 중...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3.5 py-8 text-center text-[12px] text-slate-400">
                  해당 조건의 학생이 없습니다.
                </td>
              </tr>
            ) : (
              items.map((student: Student) => (
                <tr
                  key={student.id}
                  className="border-b border-slate-100 last:border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-3.5 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(student.id)}
                      onChange={() => toggleSelect(student.id)}
                      className="w-3.5 h-3.5 accent-[#0069A8]"
                    />
                  </td>

                  {/* 학생 정보 */}
                  <td className="px-3.5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0069A8] text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                        {student.avatarInitial}
                      </div>
                      <div>
                        <p className="text-[12.5px] font-medium text-slate-900">{student.name}</p>
                        <p className="text-[10.5px] text-slate-400">ID: {student.studentCode}</p>
                      </div>
                    </div>
                  </td>
                 <td className="px-3.5 py-3">
                    <p className="text-[10.5px] text-slate-400">{student.birthDate}</p>
                  </td>
                  {/* 학급/반 */}
                  <td className="px-3.5 py-3">
                    <p className="text-[10.5px] text-slate-400">{student.classInfo}</p>
                  </td>

                  {/* 학부모 연락처 */}
                  <td className="px-3.5 py-3">
                    <p className="text-[12px] text-slate-600"> {student.Phonenumber}</p>
                  </td>

                  {/* 상태 */}
                  <td className="px-3.5 py-3">
                    <StudentStatusBadge status={student.status} />
                  </td>

                  {/* 액션 */}
                  {/* 액션 */}
<td className="px-3.5 py-3">
  <div className="flex items-center gap-2 text-slate-400">
    <button
      onClick={() =>
        openModal(
          {
            name: student.name,
            birthDate: student.birthDate,
            phone: student.Phonenumber,
            grade: student.classInfo,
            status: student.status,
          },
          student.id,
        )
      }
      className="hover:text-slate-600 transition-colors"
    >
      <Pencil className="w-3.5 h-3.5" />
    </button>
      <button
    onClick={() => {
      if (confirm(`${student.name} 학생을 삭제하시겠습니까?`)) {
        // TODO: deleteStudent(student.id) 호출
        console.log("삭제:", student.id);
      }
    }}
    className="hover:text-red-500 transition-colors"
  >
    <Trash2 className="w-3.5 h-3.5" />
  </button>
    <button className="hover:text-slate-600 transition-colors">
      <MoreVertical className="w-3.5 h-3.5" />
    </button>
  </div>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        {!isLoading && totalItems > 0 && (
          <div className="flex items-center justify-between px-3.5 py-3 border-t border-slate-100">
            <p className="text-[11.5px] text-slate-400">
              Showing {(page - 1) * 8 + 1} to {Math.min(page * 8, totalItems)} of {totalItems} students
            </p>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {/* 학생 등록 모달 */}
      <StudentRegisterModal />
    </div>
  );
}