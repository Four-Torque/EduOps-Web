"use client";

import { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input }  from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

interface AddressFieldProps {
  address: string;
  addressDetail: string;
  onAddressChange: (address: string) => void;
  onAddressDetailChange: (addressDetail: string) => void;
  error?: string;
}

export function AddressField({
  address,
  addressDetail,
  onAddressChange,
  onAddressDetailChange,
  error,
}: AddressFieldProps) {
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const handleComplete = (data: any) => {
    onAddressChange(data.address);
    setIsPostcodeOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* 주소 */}
      <Field className="gap-2">
        <FieldLabel htmlFor="address" className="font-semibold">
          주소
        </FieldLabel>
        <div className="flex gap-2">
          <Input
            id="address"
            value={address}
            placeholder="주소 검색을 눌러주세요"
            readOnly
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsPostcodeOpen(true)}
          >
            주소 검색
          </Button>
        </div>
        {error && <FieldError errors={[{ message: error }]} />}
      </Field>

      {/* 상세 주소 */}
      <Field className="gap-2">
        <FieldLabel htmlFor="addressDetail" className="font-semibold">
          상세 주소
        </FieldLabel>
        <Input
          id="addressDetail"
          value={addressDetail}
          onChange={(e) => onAddressDetailChange(e.target.value)}
          placeholder="상세 주소를 입력해주세요"
        />
      </Field>

      {/* 다음 우편번호 팝업 */}
      {isPostcodeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden w-[500px]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <p className="text-[13px] font-semibold text-slate-800">주소 검색</p>
              <button
                onClick={() => setIsPostcodeOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors text-[13px]"
              >
                ✕
              </button>
            </div>
            <DaumPostcodeEmbed onComplete={handleComplete} />
          </div>
        </div>
      )}
    </div>
  );
}