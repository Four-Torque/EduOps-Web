@AGENTS.md

# EduOps 코딩 컨벤션

## 네이밍 규칙

| 대상 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 | PascalCase | `StudentCard`, `LoginForm` |
| Hooks | `use` 접두사 | `useStudents`, `useAuthStore` |
| Service / 함수 / 변수 | camelCase | `getStudents`, `userId` |
| TanStack Query key | **camelCase 금지** — 배열 리터럴 사용 | `["student", "list"]` |
| 파일명 | 컴포넌트는 PascalCase, 나머지는 camelCase | `StudentCard.tsx`, `auth.service.ts` |

- 변수명·함수명은 축약 금지, 의미 명확하게 작성
- 단수형/복수형 구분: 배열은 복수형(`students`), 단일 객체는 단수형(`student`)

## 파일 구조

```
src/
├── app/           # 화면 — page.tsx는 라우팅 진입점만, UI 로직은 components/에
├── components/    # UI
│   ├── ui/        # shadcn/ui 기본 컴포넌트 (수정 금지)
│   ├── common/    # 도메인 비종속 공통 컴포넌트
│   └── {domain}/ # 도메인별 컴포넌트 + CSS 파일 함께 위치
├── hooks/         # 재사용 로직 (use~~ 시작)
├── services/      # API 호출 (domain.service.ts)
├── store/         # Zustand — 클라이언트 전용 상태만 (로그인 유저, UI 상태)
├── lib/           # axios 인스턴스, queryClient 설정
├── types/         # TypeScript 타입 (domain.types.ts)
├── utils/         # 공통 함수
├── constants/     # 상수
├── styles/        # global.css만
└── assets/        # 이미지
```

## 라우트 구조

```
app/
├── auth/        # 로그인, 회원가입 — 인증 불필요
├── director/    # 원장 전용
├── manager/     # 관리자 전용
└── teacher/     # 강사 전용
```

## 규칙

- **경로**: 상대 경로 사용 (`../../components/auth/LoginForm`)
- **서버 상태**: TanStack Query
- **클라이언트 전역 상태**: Zustand (서버 데이터는 절대 Zustand에 넣지 않음)
- **API**: axios 인스턴스 공통 통로로 토큰 주입, 401 공통 처리
- **CSS**: 컴포넌트 CSS는 해당 컴포넌트 폴더 안에 위치
