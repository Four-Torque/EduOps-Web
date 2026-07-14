"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Users, MessageSquare, CreditCard, FileText } from "lucide-react";
import DashboardCountCard from "@/shared/components/dashboard/DashboardCountCard";
import {
  useDashboardStaffCount,
  useDashboardStudentStats,
  useDashboardClassCount,
  useDashboardRecentAssets,
  useDashboardPendingUsers,
  useDashboardRecentMessages,
  useDashboardMonthlyTrends,
  useDashboardRecentPayments,
} from "@/features/dashboard/query";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const chartData = [
  { month: "1월", income: 4000, expense: 2400 },
  { month: "2월", income: 3000, expense: 1398 },
  { month: "3월", income: 2000, expense: 4800 },
  { month: "4월", income: 2780, expense: 3908 },
  { month: "5월", income: 1890, expense: 2800 },
  { month: "6월", income: 3500, expense: 1800 },
];

const chartConfig = {
  income: {
    label: "수입",
    color: "var(--chart-1)"
  },
  expense: {
    label: "지출",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const { data: staffCount = 0 } = useDashboardStaffCount();
  const { data: studentCount = 0 } = useDashboardStudentStats();
  const { data: classCount = 0 } = useDashboardClassCount();
  const { data: recentAssets = [] } = useDashboardRecentAssets();
  const { data: pendingUsers = [] } = useDashboardPendingUsers();
  const { data: recentMessages = [] } = useDashboardRecentMessages();
  const { data: monthlyTrends = [] } = useDashboardMonthlyTrends();
  const { data: recentPayments = [] } = useDashboardRecentPayments();

  const now = new Date();
  const startMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const chartDateRangeText = `${startMonth.getMonth() + 1}월 - ${now.getMonth() + 1}월 ${now.getFullYear()}`;

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-3 m-0">
        <DashboardCountCard title="총 직원 수" count={staffCount} />
        <DashboardCountCard title="총 학생 수" count={studentCount} />
        <DashboardCountCard title="개설 강좌 수" count={classCount} />
      </div>

      <div className="auto-rows-[300px] grid gap-4 md:grid-cols-3 m-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" /> 최근 10개 자재 / 결재
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>항목</TableHead>
                  <TableHead className="text-right">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAssets.length === 0 ? (
                  <TableRow><TableCell colSpan={2} className="text-center text-sm text-slate-500 py-8">내역이 없습니다.</TableCell></TableRow>
                ) : recentAssets.map((asset: any, i: number) => (
                  <TableRow key={asset.id || i}>
                    <TableCell className="font-medium text-sm">
                      {asset.title || asset.name || `자재/결재 신청 ${i + 1}`}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={asset.status === "APPROVED" ? "default" : "outline"}>
                        {asset.status === "APPROVED" ? "결재완료" : "대기중"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Users className="h-4 w-4" /> 사용자 승인 대기 목록
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>구분</TableHead>
                  <TableHead className="text-right">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingUsers.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center text-sm text-slate-500 py-8">대기 중인 사용자가 없습니다.</TableCell></TableRow>
                ) : pendingUsers.map((user: any, i: number) => (
                  <TableRow key={user.id || i}>
                    <TableCell className="font-medium text-sm">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-sm">{user.role === 'TEACHER' ? '선생님' : user.role === 'STAFF' ? '직원' : '사용자'}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="destructive">승인대기</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> 최근 5개 쪽지
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full space-y-4 overflow-y-auto">
            {recentMessages.length === 0 ? (
              <p className="text-center text-sm text-slate-500 py-8">새로운 쪽지가 없습니다.</p>
            ) : recentMessages.map((conv: any, i: number) => (
              <div
                key={conv.otherUser?.id || i}
                className="flex flex-col space-y-1 p-2 rounded-md hover:bg-slate-50 border border-slate-100"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">
                    {conv.otherUser?.name || "알 수 없음"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {conv.lastMessageUpdatedAt ? formatDistanceToNow(new Date(conv.lastMessageUpdatedAt), { addSuffix: true, locale: ko }) : ""}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {conv.lastMessageContent || "내용 없음"}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="auto-rows-[330px] grid gap-4 md:grid-cols-3 m-0">
        <Card className="col-span-2 flex flex-col h-full">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              수입/지출 그래프
            </CardTitle>
            <CardDescription>{chartDateRangeText}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 pb-4">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
            >
              <LineChart
                accessibilityLayer
                data={monthlyTrends.length > 0 ? monthlyTrends : chartData}
                margin={{
                  left: 12,
                  right: 12,
                  top: 10,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="current"
                  type="monotone"
                  stroke="var(--color-income)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="previous"
                  type="monotone"
                  stroke="var(--color-expense)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4" /> 최근 결제 내역
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto">
            <Table className="table-fixed w-full">
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead className="w-[35%]">결제명</TableHead>
                  <TableHead className="w-[40%]">금액</TableHead>
                  <TableHead className="w-[25%] text-right">일시</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center text-sm text-slate-500 py-8">결제 내역이 없습니다.</TableCell></TableRow>
                ) : recentPayments.map((payment: any, i: number) => (
                  <TableRow key={payment.id || i}>
                    <TableCell className="font-medium text-xs truncate max-w-0" title={payment.itemTitle || "알 수 없음"}>
                      {payment.itemTitle || "알 수 없음"}
                    </TableCell>
                    <TableCell 
                      className={`text-sm font-semibold truncate max-w-0 ${
                        payment.type === 'EXPENSE' ? 'text-red-500' : 'text-blue-600'
                      }`}
                    >
                      {payment.type === 'EXPENSE' ? '-' : '+'}
                      {payment.amount?.toLocaleString() || 0}원
                    </TableCell>
                    <TableCell className="text-right text-[9px] text-muted-foreground truncate max-w-0">
                      {payment.date ? formatDistanceToNow(new Date(payment.date), { addSuffix: true, locale: ko }) : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
