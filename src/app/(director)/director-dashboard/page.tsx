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
import { formatDistanceToNow, format, startOfMonth, endOfMonth } from "date-fns";
import { ko } from "date-fns/locale";
import { FinancesDateChart } from "@/features/finance/components/FinancesDateChart";
import { useState } from "react";
import { DatePicker } from "@/shared/components/DatePicker";

export default function Dashboard() {
  const now = new Date();
  const [startDate, setStartDate] = useState<string>(format(startOfMonth(now), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState<string>(format(endOfMonth(now), "yyyy-MM-dd"));

  const { data: staffCount = 0 } = useDashboardStaffCount();
  const { data: studentCount = 0 } = useDashboardStudentStats();
  const { data: classCount = 0 } = useDashboardClassCount();
  const { data: recentAssets = [] } = useDashboardRecentAssets();
  const { data: pendingUsers = [] } = useDashboardPendingUsers();
  const { data: recentMessages = [] } = useDashboardRecentMessages();
  const { data: monthlyTrends = [] } = useDashboardMonthlyTrends(startDate, endDate);
  const { data: recentPayments = [] } = useDashboardRecentPayments();

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8 flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-3 m-0">
        <DashboardCountCard title="총 직원 수" count={staffCount} />
        <DashboardCountCard title="총 학생 수" count={studentCount} />
        <DashboardCountCard title="개설 강좌 수" count={classCount} />
      </div>

      <div className="auto-rows-[300px] grid gap-4 md:grid-cols-3 m-0">
        <Card className="p-4">
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
                      {/* {asset.title || asset.name || `자재/결재 신청 ${i + 1}`} */}
                      {asset.categoryName}-{asset.assetName}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={
                          asset.status === "ACCEPTED"
                            ? "default"
                            : asset.status === "REJECTED"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {asset.status === "ACCEPTED"
                          ? "결재완료"
                          : asset.status === "REJECTED"
                            ? "반려됨"
                            : "대기중"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="p-4">
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
                  <TableHead className="text-center">구분</TableHead>
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

        <Card className="p-4">
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
                key={conv.id || i}
                className="flex flex-col space-y-1 p-2 rounded-md hover:bg-slate-50 border border-slate-100"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">
                    {conv.sender.name || "알 수 없음"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {conv.createdAt ? formatDistanceToNow(new Date(conv.createdAt), { addSuffix: true, locale: ko }) : ""}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {conv.title || "내용 없음"}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="auto-rows-[340px] grid gap-4 md:grid-cols-3 m-0">
        <Card className="col-span-2 flex flex-col h-full p-4">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">
              수입/지출 그래프
            </CardTitle>
            <div className="flex items-center gap-2">
              <DatePicker
                value={startDate}
                onChange={(v) => {
                  if(!v) return;
                  setStartDate(format(new Date(v), "yyyy-MM-dd"));
                }}
                className="w-[200px]"
              />
              <span className="text-muted-foreground">-</span>
              <DatePicker
                value={endDate}
                onChange={(v) => {
                  if (!v) return;
                  setEndDate(format(new Date(v), "yyyy-MM-dd"));
                }}
                className="w-[200px]"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <FinancesDateChart
              finances={monthlyTrends}
              startDate={startDate}
              endDate={endDate}
              viewMode="DAY"
            />
          </CardContent>
        </Card>

        <Card className="col-span-1 p-4">
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
                      {payment.title || "알 수 없음"}
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
                      {payment.paymentDate ? formatDistanceToNow(new Date(payment.paymentDate), { addSuffix: true, locale: ko }) : ""}
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
