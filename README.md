# EduOps Web

> 학원·교육 운영 관리 시스템(EduOps)의 프론트엔드
> Next.js 16 (App Router) + React 19 + TanStack Query 기반

원장·관리자·강사 역할별로 분리된 학원 운영 관리 웹 애플리케이션입니다.

🔗 **배포 서비스**: https://eduops.duckdns.org

---

## 기술 스택

| 항목 | 버전 |
|---|---|
| Next.js (App Router) | 16.2 |
| React | 19.2 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |
| shadcn/ui (Radix UI) | — |
| TanStack Query | ^5.79 |
| Zustand | ^5.0 |
| Axios | ^1.7 |
| React Hook Form + Zod | 폼/검증 |
| Recharts | 차트 |

---

## 요구 사항

- Node.js 18+
- 실행 중인 EduOps Server (백엔드 API)

---

## 환경 변수

루트에 `.env.local` 파일을 만듭니다.
```bash
# 백엔드 API 주소 (EduOps-Server의 주소 + /api)
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

> 인증 쿠키가 정상 전송되려면 서버의 `CLIENT_URL`이 이 앱의 주소와 일치해야 합니다(CORS).

---

## 설치 & 실행

```bash
npm install

npm run dev        # 개발 서버 (기본 http://localhost:3000)
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 실행
npm run lint       # ESLint
```

---

## 프로젝트 구조

도메인별 수직 슬라이스(feature-sliced) 구조. 한 도메인에 필요한 API·상태·타입·UI가 한 폴더에 모입니다.

```
src/
├── app/                    # Next.js App Router — 라우팅 진입점
│   ├── (auth)/             # 로그인, 회원가입, 비밀번호 재설정 (인증 불필요)
│   ├── (director)/         # 원장 전용 화면
│   ├── (manager)/          # 관리자 전용 화면
│   ├── (teacher)/          # 강사 전용 화면
│   ├── page.tsx            # 루트 — 세션 확인 후 역할별 홈으로 리다이렉트
│   └── providers.tsx       # QueryClientProvider, Toaster, ModalProvider
├── features/               # 도메인별 수직 슬라이스
│   └── {domain}/
│       ├── api.ts          # axios 호출 함수
│       ├── query.ts        # TanStack Query 훅 + queryKeys
│       ├── store.ts        # Zustand (해당 도메인 UI 상태만)
│       ├── schema.ts       # zod 스키마
│       ├── type.ts         # 타입
│       └── components/     # 도메인 UI (form/ 하위 포함)
└── shared/                 # 도메인 비종속 공통
    ├── components/ui/      # shadcn/ui (직접 수정 금지)
    ├── components/         # AppShell, Sidebar, Header, Table, Pagination 등
    ├── constants/          # 역할별 상수, navigation
    ├── hooks/              # useSession, useRoleGuard, useConfirm 등
    ├── lib/                # axios 인스턴스, cn 유틸
    └── store.ts            # 전역 UI 상태 (사이드바, 탭)
```

**도메인 목록**: `academy` · `asset` · `attendance` · `auth` · `category` · `class` · `exam` · `file` · `finance` · `message` · `payment` · `schedule` · `student` · `user` · `vendor`

---

## 라우트 구조

역할별 라우트 그룹으로 분리합니다. 그룹 폴더명(괄호)은 URL에 나타나지 않습니다.

| 그룹 | 접근 역할 | 첫 진입 화면 | 주요 화면 |
|---|---|---|---|
| `(auth)` | 누구나 | — | login, register, reset-password |
| `(director)` | 원장 | 학원 현황 대시보드 | 매출, 사용자 관리, 자재/결재, 쪽지 |
| `(manager)` | 관리자 | 학원 기본 정보 | 원생·강좌·스케줄·강사, 근태, 자재, 결제, 쪽지 |
| `(teacher)` | 강사 | 수업 시간표 | 원생 출결, 수업 파일, 성적, 강의계획서, 쪽지 |

각 그룹의 `layout.tsx`는 `useRoleGuard([...])`로 접근을 통제하며, 세션 확인이 끝나고 권한이 있을 때만 렌더합니다.

```tsx
const { ready } = useRoleGuard(["TEACHER"]);
if (!ready) return null;
```

---

## 상태 관리 원칙

- **서버 상태 → TanStack Query.** 로그인 유저 정보도 서버 상태이므로 `useSession()`으로 조회합니다.
- **클라이언트 전역 상태 → Zustand.** 사이드바·탭·필터 등 UI 상태만. **서버 데이터는 절대 Zustand에 넣지 않습니다.**

---

## 인증 처리

- 토큰은 **httpOnly 쿠키**(`eo_atk`, `eo_rtk`)로만 오가며, 프론트에서 토큰을 저장·조회·첨부하지 않습니다.
- `shared/lib/axios.ts`의 인스턴스만 사용합니다.
  - `apiClient` — `withCredentials: true`. 쿠키 자동 첨부. **401 발생 시 `/auth/refresh` 후 원요청 자동 재시도**(single-flight로 중복 호출 방지).
  - `publicApi` — 쿠키가 필요 없는 호출용.
- 에러는 `ApiHttpError`로 정규화되므로 `error.message`를 그대로 toast에 사용합니다.

---

## 컨벤션

코딩 컨벤션 상세는 [`CLAUDE.md`](CLAUDE.md)를 참고하세요.

- 경로: `@/` 절대 경로 사용 (`@/features/auth/query`, `@/shared/components/ui/button`)
- 컴포넌트 PascalCase, 그 외 camelCase
- Query key는 `features/{domain}/query.ts` 상단에 `{domain}QueryKeys` 객체로 관리
- 폼: React Hook Form + Zod (`zodResolver`), 스키마는 `features/{domain}/schema.ts`

---
