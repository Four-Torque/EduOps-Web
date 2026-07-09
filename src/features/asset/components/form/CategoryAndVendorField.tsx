import { useFindCategories } from "@/features/category/query";
import { Category } from "@/features/category/type";
import { useFindVendors } from "@/features/vendor/query";
import { Vendor } from "@/features/vendor/type";
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import z from "zod/v3";
import { useFindAssets } from "@/features/asset/query";
import { AssetApplicationFormSchema } from "@/features/asset/schema";

interface CategoryAndVendorFieldProps {
  form: UseFormReturn<z.infer<typeof AssetApplicationFormSchema>>;
}

export default function CategoryAndVendorField({
  form,
}: CategoryAndVendorFieldProps) {
  const { data: categories } = useFindCategories();
  const { data: vendorsData } = useFindVendors({ page: "1", limit: "50" });

  const { data: assetsData } = useFindAssets({ page: "1", limit: "50" });

  const vendors = vendorsData?.data || [];
  const assets = assetsData?.data || [];

  const currentAssetName = form.watch("name");

  const matchedAsset = assets.find(
    (asset: any) =>
      asset.name.trim().toLowerCase() ===
      (currentAssetName || "").trim().toLowerCase(),
  );

  const isExistingAsset = !!matchedAsset;

  useEffect(() => {
    if (isExistingAsset && matchedAsset) {
      form.setValue("categoryId", matchedAsset.categoryId);
      form.setValue("vendorId", matchedAsset.vendorId || "");
    } else if (!currentAssetName) {
      form.setValue("categoryId", "");
      form.setValue("vendorId", "");
    }
  }, [isExistingAsset, matchedAsset, currentAssetName, form]);
  return (
    <>
      <Controller
        name="categoryId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="gap-2">
            <FieldLabel htmlFor="categoryId" className="font-semibold">
              분류
            </FieldLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={isExistingAsset}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="분류를 선택하세요" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                onPointerDownOutside={(e) => e.preventDefault()}
              >
                <SelectGroup>
                  {categories?.map((category: Category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="vendorId"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="gap-2">
            <FieldLabel htmlFor="vendorId" className="font-semibold">
              구매처
            </FieldLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={isExistingAsset}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="구매처를 선택하세요" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                onPointerDownOutside={(e) => e.preventDefault()}
              >
                <SelectGroup>
                  {vendors?.map((vendor: Vendor) => (
                    <SelectItem key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  );
}
