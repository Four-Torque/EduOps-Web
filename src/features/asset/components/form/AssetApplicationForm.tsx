import SubmitButton from "@/shared/components/SubmitButton";
import { FieldGroup } from "@/shared/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import AssetNameField from "./AssetNameField";
import QuantityAndPriceField from "./QuantityAndPriceField";
import CategoryAndVendorField from "./CategoryAndVendorField";
import ReasonField from "./ReasonField";
import { AssetApplicationFormSchema } from "@/features/asset/schema";

interface AssetApplicationFormProps {
  onSubmit: (values: z.infer<typeof AssetApplicationFormSchema>) => void;
  defaultValues: z.infer<typeof AssetApplicationFormSchema>;
}

export default function AssetApplicationForm({
  onSubmit,
  defaultValues,
}: AssetApplicationFormProps) {
  const form = useForm<z.infer<typeof AssetApplicationFormSchema>>({
    resolver: zodResolver(AssetApplicationFormSchema),
    defaultValues,
  });

  function handleSubmit(values: z.infer<typeof AssetApplicationFormSchema>) {
    onSubmit(values);
  }

  return (
    <form
      id="asset-application-form"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FieldGroup className="gap-4">
        <AssetNameField form={form} />
        <CategoryAndVendorField form={form} />
        <QuantityAndPriceField form={form} />
        <ReasonField form={form} />
        <SubmitButton title="저장" />
      </FieldGroup>
    </form>
  );
}
