import { Icon } from "../ui/icon";

export default function Logo() {
  return (
    <div className="flex flex-col items-center mb-7">
      <div className="size-16 bg-[#0069A8] rounded-2xl flex items-center justify-center mb-4.5">
        <Icon.logo className="size-8.5 text-white" />
      </div>
      <h1 className="text-[24px] font-bold text-[#1a3a6b] mb-1.5">
        EduOps ERP
      </h1>
      <p className="text-[13.5px] text-[#7a8399]">
        학원 경영을 위한 스마트한 첫 걸음
      </p>
    </div>
  );
}
