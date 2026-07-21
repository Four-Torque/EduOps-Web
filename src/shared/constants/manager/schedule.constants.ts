// 서버 schedule.repository.ts의 subjectMap 키와 1:1로 맞춘 목록.
// 별도 "과목" 엔티티가 없어 class.name에 이 라벨이 포함되는지로 검색하는 방식이라,
// 여기 없는 값은 백엔드에서 걸러지지 않는다.
export const SCHEDULE_SUBJECT_OPTIONS = [
  { value: "all", label: "과목: All" },
  { value: "math", label: "수학" },
  { value: "english", label: "영어" },
  { value: "korean", label: "국어" },
  { value: "science", label: "과학" },
  { value: "history", label: "역사" },
  { value: "socialStudies", label: "사회" },
  { value: "art", label: "미술" },
  { value: "music", label: "음악" },
  { value: "physicalEducation", label: "체육" },
  { value: "it", label: "정보" },
  { value: "foreignLanguage", label: "외국어" },
] as const;
