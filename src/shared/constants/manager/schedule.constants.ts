export const SCHEDULE_ROOM_OPTIONS = [
  { value: "all", label: "강의장: All" },
  { value: "101호", label: "101호" },
  { value: "102호", label: "102호" },
  { value: "203호", label: "203호" },
] as const;

export const SCHEDULE_INSTRUCTOR_OPTIONS = [
  { value: "all", label: "강사: All" },
  { value: "김춘식", label: "김춘식" },
  { value: "김길동", label: "김길동" },
  { value: "교사-미나", label: "교사-미나" },
] as const;

export const SCHEDULE_SUBJECT_OPTIONS = [
  { value: "all", label: "과목: All" },
  { value: "math", label: "수학" },
  { value: "english", label: "영어" },
] as const;

// 기준 주(2023-10-16 월요일)로 목 데이터 생성
const d = (day: number, hour: number, min = 0) =>
  new Date(2023, 9, day, hour, min); // month는 0-index (9=10월)

export const MOCK_SCHEDULE = {
  events: [
    { id: "1", title: "물리 수능대비반", instructor: "Dr. DRE",  room: "203호", start: d(16, 9),  end: d(16, 11) },
    { id: "2", title: "덧셈 뺄셈 초딩반", instructor: "이완용",   room: "230호", start: d(17, 9),  end: d(17, 10) },
    { id: "3", title: "수학 대비대비반", instructor: "프린스슨", room: "302호", start: d(18, 10), end: d(18, 11) },
    { id: "4", title: "지구과학 고등반", instructor: "박지성",   room: "104호", start: d(19, 11), end: d(19, 12) },
    { id: "5", title: "지구과학 고등반", instructor: "박지성",   room: "104호", start: d(19, 12), end: d(19, 13) },
    { id: "6", title: "지구과학 고등반", instructor: "박지성",   room: "104호", start: d(20, 13), end: d(20, 14) },
  ],
};