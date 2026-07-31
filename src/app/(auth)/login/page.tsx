import LoginForm from "@/features/auth/components/form/LoginForm";
import Logo from "@/features/auth/components/Logo";

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Logo bgColor="#0069A8" textColor="#ffffff" />
      <LoginForm />
    </div>
  );
}
