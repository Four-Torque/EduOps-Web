import { Card, CardContent } from "@/shared/components/ui/card";

interface AttendanceSummaryProps {
  present: number;
  late: number;
  absent: number;
}

export default function AttendanceSummary({ present, late, absent }: AttendanceSummaryProps) {
  return (
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="flex flex-col items-center justify-center bg-blue-50/50 text-blue-500 rounded-lg size-20">
            <span className="text-sm font-bold">출석</span>
            <span className="text-xl font-bold">{present}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-orange-50/50 text-orange-400 rounded-lg size-20">
            <span className="text-sm font-bold">지각</span>
            <span className="text-xl font-bold">{late}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-red-50 text-red-500 rounded-lg size-20">
            <span className="text-sm font-bold">결석</span>
            <span className="text-xl font-bold">{absent}</span>
          </div>
        </div>
      </CardContent>
  )
}