import { Users } from "lucide-react"

interface StudentAttendanceHeaderProps {
  classNameStr: string;
  totalStudents: number;
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function StudentAttendanceHeader({
  classNameStr,
  totalStudents,
  selectedDate,
  onDateChange
}: StudentAttendanceHeaderProps) {
  const maxDate = new Date().toISOString().split("T")[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">{classNameStr}</h2>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium">
        <div className="flex items-center gap-1.5 relative">
          <input 
            type="date"
            value={selectedDate}
            max={maxDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="w-4 h-4" />
          <span>총 {totalStudents}명</span>
        </div>
      </div>
    </div>
  )
}
