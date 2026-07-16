import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Users } from "lucide-react";

interface DashboardCountCardProps {
  title: string;
  count: number;
}

export default function DashboardCountCard({
  title,
  count,
}: DashboardCountCardProps) {
  return (
    <Card className="border p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-2xl font-bold">{count}</div>
      </CardHeader>
    </Card>
  );
}
