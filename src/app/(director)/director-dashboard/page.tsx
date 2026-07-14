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
  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCountCard title="총 직원 수" count={12} />
        <DashboardCountCard title="총 학생 수" count={148} />
        <DashboardCountCard title="개설 강좌 수" count={24} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" /> 최근 10개 자재 / 결재
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>항목</TableHead>
                  <TableHead className="text-right">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-sm">
                      A강의실 교재 구입 외 {i}건
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={i % 2 === 0 ? "default" : "outline"}>
                        {i % 2 === 0 ? "결재완료" : "대기중"}
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
          <CardContent className="h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead>구분</TableHead>
                  <TableHead className="text-right">상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-sm">
                      홍길동 {i + 1}
                    </TableCell>
                    <TableCell className="text-sm">신입생</TableCell>
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
          <CardContent className="h-[300px] space-y-4 overflow-y-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col space-y-1 p-2 rounded-md hover:bg-slate-50 border border-slate-100"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">
                    학부모 상담 요청
                  </span>
                  <span className="text-xs text-muted-foreground">14:32</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">
                  셔틀버스 노선 관련하여 문의 드립니다...
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              수입/지출 그래프
            </CardTitle>
            <CardDescription>1월 - 6월 2026</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="max-h-[300px] w-full"
            >
              <LineChart
                accessibilityLayer
                data={chartData}
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
                  dataKey="income"
                  type="monotone"
                  stroke="var(--color-income)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="expense"
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
          <CardContent className="h-[380px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>학생명</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead className="text-right">일시</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 7 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-sm">
                      김지우
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-blue-600">
                      350,000원
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      방금 전
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
