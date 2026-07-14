// // @/components/manager/academic/course/CourseCard.tsx
// "use client";

// import { MoreVertical, User, Calendar, MapPin, Users } from "lucide-react";
// import type { Course } from "@/features/class/type";

// export function CourseCard({ course }: { course: Course }) {
//   const ratio = course.currentStudents / course.maxStudents;
//   const barColor = course.isFull ? "bg-red-500" : "bg-slate-800";

//   return (
//     <div className="border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow bg-white">
//       {/* 태그 + 더보기 */}
//       <div className="flex items-start justify-between mb-2.5">
//         <div className="flex items-center gap-1.5">
//           {course.tags.map((tag, i) => (
//             <span
//               key={tag}
//               className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
//                 i === 0
//                   ? "bg-slate-100 text-slate-600"
//                   : "bg-slate-100 text-slate-500"
//               }`}
//             >
//               {tag}
//             </span>
//           ))}
//           {course.isFull && (
//             <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-50 text-red-500 flex items-center gap-0.5">
//               ● Full
//             </span>
//           )}
//         </div>
//         <button className="text-slate-300 hover:text-slate-500 transition-colors">
//           <MoreVertical className="w-4 h-4" />
//         </button>
//       </div>

//       {/* 제목 */}
//       <h3 className="text-[15px] font-bold text-slate-900 mb-3 pb-3 border-b border-slate-100">
//         {course.title}
//       </h3>

//       {/* 정보 */}
//       <div className="flex flex-col gap-2 text-slate-500">
//         <div className="flex items-center gap-1.5 text-[11.5px]">
//           <User className="w-3.5 h-3.5 shrink-0" />
//           <span>{course.instructor}</span>
//         </div>

//         <div className="flex items-center justify-between text-[11.5px]">
//           <div className="flex items-center gap-1.5">
//             <Calendar className="w-3.5 h-3.5 shrink-0" />
//             <span>{course.schedule}</span>
//           </div>
//           <div className="flex items-center gap-1.5">
//             <MapPin className="w-3.5 h-3.5 shrink-0" />
//             <span>{course.room}</span>
//           </div>
//         </div>
//       </div>

//       {/* 학생 수 + 게이지 */}
//       <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
//         <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-600">
//           <Users className="w-3.5 h-3.5" />
//           <span>
//             {course.currentStudents} / {course.maxStudents} 학생 수
//           </span>
//         </div>
//         <div className="w-14 h-1 rounded-full bg-slate-100 overflow-hidden">
//           <div
//             className={`h-full rounded-full ${barColor}`}
//             style={{ width: `${ratio * 100}%` }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
