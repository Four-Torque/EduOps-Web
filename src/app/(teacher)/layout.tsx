import AppShell from "../../components/common/AppShell";
import { TEACHER_NAV } from "../../constants/navigation";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <AppShell navItems={TEACHER_NAV}>{children}</AppShell>;
}
