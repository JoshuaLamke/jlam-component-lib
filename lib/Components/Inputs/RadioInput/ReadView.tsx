import { forwardRef, Ref } from "react";
import { SelectOption } from "../../../";
import {
  getDefaultValueMappings,
  RadioInputMappings,
  StoredRadioInputValue,
} from "./Field";
import { FieldAria } from "react-aria";

export interface RadioInputReadViewProps<
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
> {
  storedValue: StoredRadioInputValue<OptionValueName, OptionLabelName>;
  optionValueName: OptionValueName;
  optionLabelName: OptionLabelName;
  noValueMessage?: string;
  valueMapping?: "stringValue" | "booleanValue" | "objectValue";
  valueMappingOverride?: <
    OptionValueName extends string = "value",
    OptionLabelName extends string = "label"
  >(
    options: SelectOption<OptionValueName, OptionLabelName>[]
  ) => RadioInputMappings<OptionValueName, OptionLabelName>;
  options: SelectOption<OptionValueName, OptionLabelName>[];
  fieldProps: FieldAria["fieldProps"];
}

const RadioInputReadViewInner = <
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
>(
  {
    storedValue,
    optionValueName,
    optionLabelName,
    noValueMessage,
    valueMapping = "objectValue",
    valueMappingOverride,
    options,
    fieldProps,
  }: RadioInputReadViewProps<OptionValueName, OptionLabelName>,
  ref: Ref<HTMLElement | null>
) => {
  const defaultValueMappings = getDefaultValueMappings(options);

  const { formatFromStoredValToDisplayVal } =
    valueMappingOverride?.(options) ?? defaultValueMappings[valueMapping];

  const displayValue = formatFromStoredValToDisplayVal(
    storedValue,
    optionValueName,
    optionLabelName
  );

  if (displayValue) {
    return (
      <div
        className="inline-flex items-center px-2 py-1 bg-gray-200 text-gray-900 rounded w-fit text-xs font-semibold"
        ref={ref as Ref<HTMLDivElement>}
        {...fieldProps}
      >
        {displayValue}
      </div>
    );
  }

  return (
    <div
      className="text-gray-700"
      ref={ref as Ref<HTMLDivElement>}
      {...fieldProps}
    >
      {noValueMessage || "None Selected"}
    </div>
  );
};

const RadioInputReadView = forwardRef(RadioInputReadViewInner) as <
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
>(
  props: RadioInputReadViewProps<OptionValueName, OptionLabelName> & {
    ref?: Ref<HTMLElement | null>;
  }
) => ReturnType<typeof RadioInputReadViewInner>;

export default RadioInputReadView;
