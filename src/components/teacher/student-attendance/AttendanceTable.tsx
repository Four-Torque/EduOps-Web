import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AttendanceStatus, Student } from "@/types/teacher/attendance.type";

interface AttendanceTableProps {
  students: Student[];
  onStatusChange: (id: string, status: AttendanceStatus) => void;
}

export default function AttendanceTable({ students, onStatusChange }: AttendanceTableProps) {
  return (
    <div className="border rounded-xl bg-white flex flex-col mt-4 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-3 px-5 border-b bg-gray-50/50">
        <div className="flex items-center gap-5">
          <h2 className="text-base font-bold text-gray-800">출결 리스트</h2>
          <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" />출석</div>
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" />지각</div>
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500" />결석</div>
          </div>
        </div>
      </div>

      <div className="px-2 pb-2">
        <Table>
          <TableHeader className="bg-transparent">
            <TableRow className="hover:bg-transparent border-b border-gray-100">
              <TableHead className="w-[10%] text-center h-10 text-xs font-semibold text-gray-500">번호</TableHead>
              <TableHead className="w-[20%] text-center text-xs font-semibold text-gray-500">성명</TableHead>
              <TableHead className="w-[30%] text-center text-xs font-semibold text-gray-500">연락처</TableHead>
              <TableHead className="w-[40%] text-center text-xs font-semibold text-gray-500">출결 상태</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-sm text-gray-500">
                  학생 목록이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, index) => (
                <TableRow key={student.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="text-center text-sm text-gray-400 font-medium h-12">{index + 1}</TableCell>
                  <TableCell className="text-center text-sm font-semibold text-gray-700">{student.name}</TableCell>
                  <TableCell className="text-center text-sm text-gray-500">{student.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1.5">
                      <Button
                        variant={student.status === "ATTENDED" ? "default" : "outline"}
                        size="sm"
                        className={`w-14 h-7 text-[11px] font-bold rounded-md transition-all ${
                          student.status === "ATTENDED" 
                            ? "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 shadow-none" 
                            : "text-gray-400 border-gray-200 shadow-none hover:bg-gray-100 hover:text-gray-600"
                        }`}
                        onClick={() => onStatusChange(student.id, "ATTENDED")}
                      >
                        출석
                      </Button>
                      <Button
                        variant={student.status === "TARDY" ? "default" : "outline"}
                        size="sm"
                        className={`w-14 h-7 text-[11px] font-bold rounded-md transition-all ${
                          student.status === "TARDY" 
                            ? "bg-orange-50 text-orange-500 border border-orange-200 hover:bg-orange-100 shadow-none" 
                            : "text-gray-400 border-gray-200 shadow-none hover:bg-gray-100 hover:text-gray-600"
                        }`}
                        onClick={() => onStatusChange(student.id, "TARDY")}
                      >
                        지각
                      </Button>
                      <Button
                        variant={student.status === "ABSENT" ? "default" : "outline"}
                        size="sm"
                        className={`w-14 h-7 text-[11px] font-bold rounded-md transition-all ${
                          student.status === "ABSENT" 
                            ? "bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 shadow-none" 
                            : "text-gray-400 border-gray-200 shadow-none hover:bg-gray-100 hover:text-gray-600"
                        }`}
                        onClick={() => onStatusChange(student.id, "ABSENT")}
                      >
                        결석
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
