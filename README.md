# EduOps — 교육 ERP 시스템

> Next.js 16 App Router + NestJS + Prisma + Redis 기반 교육 운영 관리 플랫폼

---

## 📦 기술 스택

### 프론트엔드 (`/eduops`)
| 항목 | 버전 |
|------|------|
| Next.js (App Router) | 16.2.9 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| shadcn/ui (Radix) | 수동 설치 |
| Zustand | ^5.0.3 |
| TanStack Query | ^5.79.0 |
| Axios | ^1.7.9 |

---

## 🚀 시작하기

### 1. 환경 변수 설정

**프론트엔드**
```bash
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. 실행

**프론트엔드**
```bash
npm run dev        # http://localhost:3000
```

---

## 📁 프로젝트 구조

### 프론트엔드

```
src/
├── app/
│   ├── (auth)/          # 로그인, 회원가입 (인증 불필요)
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/     # 대시보드 레이아웃 (사이드바 + 헤더)
│   │   ├── dashboard/   # 메인 대시보드
│   │   ├── students/    # 학생 관리
│   │   ├── teachers/    # 교사 관리
│   │   ├── courses/     # 강좌 관리
│   │   ├── schedules/   # 시간표
│   │   ├── grades/      # 성적 관리
│   │   └── attendance/  # 출결 관리
│   ├── layout.tsx
│   └── providers.tsx    # QueryClientProvider
├── components/
│   ├── ui/              # shadcn 컴포넌트 (Button, Card, Badge...)
│   ├── layout/          # Sidebar, Header
│   └── shared/          # PageHeader, StatCard, DataTable
├── hooks/               # TanStack Query 훅 (useStudents...)
├── lib/
│   ├── api/             # API 함수 (axios 기반)
│   ├── axios.ts         # Axios 인스턴스 + 인터셉터
│   ├── query-client.ts  # QueryClient 설정
│   └── utils.ts         # cn() 유틸
├── stores/              # Zustand 스토어 (auth, ui)
└── types/               # TypeScript 타입 정의
```
