import { CreatableSelect } from "@/components/common/CreatableSelect";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useFindAssets } from "@/hooks/asset/useAsset";
import { debounce } from "@/lib/utils";
import { Asset } from "@/types/asset/asset.types";
import { AssetApplicationFormSchema } from "@/validations/asset.valid";
import { useCallback, useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod/v3";

interface AssetNameFieldProps {
  form: UseFormReturn<z.infer<typeof AssetApplicationFormSchema>>;
}

export default function AssetNameField({ form }: AssetNameFieldProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: assetsData } = useFindAssets({
    page: "1",
    limit: "20",
    search: searchTerm,
  });
  const assets = assetsData?.data || [];

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 300),
    [],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel?.();
  }, [debouncedSearch]);
  return (
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className="gap-2">
          <FieldLabel htmlFor="name" className="font-semibold">
            품목명
          </FieldLabel>
          <CreatableSelect
            options={assets?.map((asset: Asset) => ({
              value: asset.id,
              label: asset.name,
            }))}
            value={field.value}
            onChange={(value) => {
              debouncedSearch(value);
              field.onChange(value);
            }}
            placeholder="품목명을 입력하거나 선택하세요"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
