import { Card, CardContent } from "@/components/ui/card"

interface AttendanceSummaryProps {
  present: number;
  late: number;
  absent: number;
}

export default function AttendanceSummary({ present, late, absent }: AttendanceSummaryProps) {
  return (
    <Card size='sm' className="w-fit border shadow-sm bg-white">
      <CardContent className="flex flex-col gap-4">
        <div className="text-sm font-semibold text-muted-foreground">오늘의 출결 현황</div>
        <div className="flex gap-3">
          <div className="flex flex-col items-center justify-center bg-blue-50/50 text-blue-500 rounded-lg w-20 h-20">
            <span className="text-sm font-bold">출석</span>
            <span className="text-3xl font-bold">{present}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-orange-50/50 text-orange-400 rounded-lg w-20 h-20">
            <span className="text-sm font-bold">지각</span>
            <span className="text-3xl font-bold">{late}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-red-50 text-red-500 rounded-lg w-20 h-20">
            <span className="text-sm font-bold">결석</span>
            <span className="text-3xl font-bold">{absent}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
