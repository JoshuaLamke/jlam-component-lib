import { FieldValues } from "react-hook-form";
import RadioInputField, { RadioInputFieldProps } from "../Field";

export interface YesNoInputFieldProps<TData extends FieldValues>
  extends Omit<
    RadioInputFieldProps<TData, "value", "label">,
    | "valueMapping"
    | "optionValueName"
    | "optionLabelName"
    | "options"
    | "valueMappingOverride"
  > {
  yesLabelName?: string;
  noLabelName?: string;
}

const YesNoInputField = <TData extends FieldValues = FieldValues>({
  yesLabelName,
  noLabelName,
  ...props
}: YesNoInputFieldProps<TData>) => {
  return (
    <RadioInputField<TData, "value", "label">
      {...props}
      valueMapping={"booleanValue"}
      options={[
        { label: yesLabelName || "Yes", value: "true" },
        { label: noLabelName || "No", value: "false" },
      ]}
      optionValueName="value"
      optionLabelName="label"
    />
  );
};

export default YesNoInputField;
