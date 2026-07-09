import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod/v3";
import { AssetApplicationFormSchema } from "@/features/asset/schema";

interface QuantityAndPriceFieldProps {
  form: UseFormReturn<z.infer<typeof AssetApplicationFormSchema>>;
}

export default function QuantityAndPriceField({
  form,
}: QuantityAndPriceFieldProps) {
  const currentPrice = form.watch("price") || 0;
  const currentQuantity = form.watch("quantity") || 0;

  const [unitPrice, setUnitPrice] = useState<number | "">(
    Math.floor(currentPrice / currentQuantity) || 0,
  );

  useEffect(() => {
    const price = Number(unitPrice || 0) * Number(currentQuantity || 0);
    form.setValue("price", price, { shouldValidate: true });
  }, [unitPrice, currentQuantity, form]);

  return (
    <>
      <Controller
        name="quantity"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="gap-2">
            <FieldLabel htmlFor="quantity" className="font-semibold">
              요청 수량
            </FieldLabel>
            <Input
              {...field}
              type="number"
              min={1}
              placeholder="수량을 입력하세요"
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = value ? parseInt(value, 10) : 0;
                field.onChange(numericValue);
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Field className="gap-2">
        <Label htmlFor="unitPrice" className="font-semibold">
          단일품목 단가
        </Label>
        <Input
          id="unitPrice"
          type="text"
          value={unitPrice !== "" ? Number(unitPrice).toLocaleString() : "0"}
          placeholder="단일품목 단가를 입력하세요."
          onChange={(e) => {
            const rawValue = e.target.value;
            const cleanValue = rawValue.replace(/[^0-9]/g, "");
            const numericValue = cleanValue ? parseInt(cleanValue, 10) : 0;
            setUnitPrice(numericValue);
          }}
        />
      </Field>

      <Controller
        name="price"
        control={form.control}
        render={({ field, fieldState }) => {
          const displayValue =
            field.value !== undefined && field.value !== null
              ? Number(field.value).toLocaleString()
              : "";

          return (
            <Field className="gap-2">
              <FieldLabel htmlFor="price" className="font-semibold">
                총 금액
              </FieldLabel>
              <Input
                {...field}
                type="text"
                value={displayValue}
                placeholder="단가와 수량을 입력하면 자동 계산됩니다."
                readOnly
                className="bg-muted text-muted-foreground"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          );
        }}
      />
    </>
  );
}
