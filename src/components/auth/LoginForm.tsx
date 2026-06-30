"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/auth.store";

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/class");
  }

  /*
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  // 1. API 호출
  const res = await axios.post("/auth/login", { email, password });

  // 2. 응답에서 유저 정보 + 토큰 꺼냄
  const { user, accessToken } = res.data;

  // 3. auth store에 저장 (지금 dev 버튼이랑 완전히 동일)
  setAuth(user, accessToken);

  // 4. role 보고 홈으로 이동 — ROLE_HOME 그대로 사용
  router.push(ROLE_HOME[user.role]);
}

  */

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">EduOps</h1>
      <p className="text-sm text-slate-500 mb-8">교육 운영 관리 시스템</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@eduops.kr"
            required
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-slate-800 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-slate-700 transition-colors"
        >
          로그인
        </button>
      </form>

      <div className="mt-6 flex justify-center gap-4 text-xs text-slate-400">
        <a href="/signup" className="hover:text-slate-600">회원가입</a>
        <span>·</span>
        <a href="/findpassword" className="hover:text-slate-600">비밀번호 찾기</a>
      </div>

      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => { setAuth({ id: 1, name: "강사", role: "TEACHER" }, "dev-token"); router.push("/class"); }}
            className="w-full border border-dashed border-orange-300 text-orange-400 rounded-lg py-2 text-xs font-medium hover:bg-orange-50 transition-colors"
          >
            [DEV] 강사 바로 입장
          </button>
          <button
            type="button"
            onClick={() => { setAuth({ id: 2, name: "관리자", role: "MANAGER" }, "dev-token"); router.push("/academic"); }}
            className="w-full border border-dashed border-blue-300 text-blue-400 rounded-lg py-2 text-xs font-medium hover:bg-blue-50 transition-colors"
          >
            [DEV] 관리자 바로 입장
          </button>
          <button
            type="button"
            onClick={() => { setAuth({ id: 3, name: "원장", role: "DIRECTOR" }, "dev-token"); router.push("/finance"); }}
            className="w-full border border-dashed border-purple-300 text-purple-400 rounded-lg py-2 text-xs font-medium hover:bg-purple-50 transition-colors"
          >
            [DEV] 원장 바로 입장
          </button>
        </div>
      )}
    </div>
  );
}
