import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/auth/Logo";

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col items-center">
      <Logo bgColor="#0069A8" textColor="#ffffff" />
      <LoginForm />
    </div>
  );
}
