export const COURSE_LEVEL_OPTIONS = [
  { value: "all",       label: "대체가능 없음" },
  { value: "available", label: "대체가능" },
  { value: "full",      label: "정원마감" },
] as const;

export const COURSE_SUBJECT_OPTIONS = [
  { value: "all", label: "전체" },
] as const;

export const MOCK_COURSES = {
  items: [
    {
      id: "1",
      title: "미적분 II (수능 대비반)",
      tags: ["수학", "고급반"],
      isFull: false,
      instructor: "Dr. DRE 강사",
      schedule: "월, 수, 금 · 10:00 - 11:30",
      room: "205호",
      currentStudents: 24,
      maxStudents: 30,
    },
    {
      id: "2",
      title: "고1 물리 기초반",
      tags: ["과학"],
      isFull: true,
      instructor: "손담비 강사",
      schedule: "목, 금 · 14:00 - 16:00",
      room: "203호",
      currentStudents: 30,
      maxStudents: 30,
    },
    {
      id: "3",
      title: "세계지리",
      tags: ["인문학", "다이나마이트"],
      isFull: false,
      instructor: "아돌프 히포",
      schedule: "금 · 09:00 - 12:00",
      room: "304호",
      currentStudents: 15,
      maxStudents: 25,
    },
  ],
  totalItems: 3,
  totalPages: 1,
};