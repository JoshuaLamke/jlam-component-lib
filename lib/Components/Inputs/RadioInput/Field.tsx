import {
  FieldValues,
  Path,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import {
  Field,
  FieldProps,
  omit,
  SelectOption,
  Size,
  TooltipButtonProps,
} from "../../../";
import RadioInputReadView, { RadioInputReadViewProps } from "./ReadView";
import RadioInputEditView, { RadioInputEditViewProps } from "./EditView";
import { ForwardRefExoticComponent, Ref, RefAttributes } from "react";
import { FieldAria } from "react-aria";

export type StoredRadioInputValue<
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
> =
  | SelectOption<OptionValueName, OptionLabelName>
  | string
  | boolean
  | null
  | undefined;

export type RadioInputMappings<
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
> = {
  formatFromRadioValToStoredVal: (
    radioInputValue: string | null | undefined,
    optionValueName: string,
    optionLabelName: string
  ) => StoredRadioInputValue<OptionValueName, OptionLabelName>;
  formatFromStoredValToRadioVal: (
    storedVal: StoredRadioInputValue<OptionValueName, OptionLabelName>,
    optionValueName: string,
    optionLabelName: string
  ) => string | null;
  formatFromStoredValToDisplayVal: (
    storedVal: StoredRadioInputValue<OptionValueName, OptionLabelName>,
    optionValueName: string,
    optionLabelName: string
  ) => string | null | undefined;
};

export type ValueMapping = "stringValue" | "booleanValue" | "objectValue";

export const getDefaultValueMappings = <
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
>(
  options: SelectOption<OptionValueName, OptionLabelName>[]
): Record<
  ValueMapping,
  RadioInputMappings<OptionValueName, OptionLabelName>
> => ({
  objectValue: {
    formatFromRadioValToStoredVal: (radioInputValue, optionValueName) => {
      if (!radioInputValue) {
        return null;
      }

      return options.find(
        (option) => option[optionValueName] === radioInputValue
      );
    },
    formatFromStoredValToRadioVal: (storedValue, optionValueName) => {
      if (!storedValue) {
        return null;
      }

      return (storedValue as SelectOption<OptionValueName, OptionLabelName>)[
        optionValueName
      ];
    },
    formatFromStoredValToDisplayVal: (
      storedValue,
      _optionValueName,
      optionLabelName
    ) => {
      if (!storedValue) {
        return null;
      }

      return (storedValue as SelectOption)[optionLabelName];
    },
  },
  stringValue: {
    formatFromRadioValToStoredVal: (radioInputValue) => {
      return radioInputValue;
    },
    formatFromStoredValToRadioVal: (storedValue, optionValueName) => {
      if (!storedValue) {
        return null;
      }

      return options.find(
        (option) => option[optionValueName] === storedValue
      )?.[optionValueName];
    },
    formatFromStoredValToDisplayVal: (
      storedValue,
      optionValueName,
      optionLabelName
    ) => {
      if (!storedValue) {
        return null;
      }

      return options.find(
        (option) => option[optionValueName] === storedValue
      )?.[optionLabelName];
    },
  },
  booleanValue: {
    formatFromRadioValToStoredVal: (radioInputValue) => {
      if (radioInputValue === null || radioInputValue === undefined) {
        return null;
      }
      return radioInputValue === "true";
    },
    formatFromStoredValToRadioVal: (storedValue) => {
      if (storedValue === null || storedValue === undefined) {
        return null;
      }

      return storedValue ? "true" : "false";
    },
    formatFromStoredValToDisplayVal: (
      storedValue,
      optionValueName,
      optionLabelName
    ) => {
      const storedValueToString = storedValue ? "true" : "false";
      if (storedValue === null || storedValue === undefined) {
        return null;
      }

      return options.find(
        (option) => option[optionValueName] === storedValueToString
      )?.[optionLabelName];
    },
  },
});

export interface RadioInputFieldProps<
  TData extends FieldValues,
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
> {
  label?: React.ReactNode;
  name: Path<TData>;
  options: SelectOption<OptionValueName, OptionLabelName>[];
  size?: Size;
  valueMapping?: ValueMapping;
  valueMappingOverride?: <
    OptionValueName extends string = "value",
    OptionLabelName extends string = "label"
  >(
    options: SelectOption<OptionValueName, OptionLabelName>[]
  ) => RadioInputMappings<OptionValueName, OptionLabelName>;
  onChange?: (
    val: StoredRadioInputValue<OptionValueName, OptionLabelName>
  ) => void;
  onBlur?: () => void;
  state?: "read" | "edit";
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  optionValueName: OptionValueName;
  optionLabelName: OptionLabelName;
  helperText?: string;
  tooltipProps?: TooltipButtonProps;
  ReadView?: ForwardRefExoticComponent<
    RadioInputReadViewProps<OptionValueName, OptionLabelName> &
      RefAttributes<HTMLElement>
  >;
  EditView?: ForwardRefExoticComponent<
    RadioInputEditViewProps<TData, OptionValueName, OptionLabelName> &
      RefAttributes<HTMLElement>
  >;
  noValueMessage?: string;
  formMethods?: UseFormReturn<TData>;
}

const RadioInputField = <
  TData extends FieldValues = FieldValues,
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
>(
  props: RadioInputFieldProps<TData, OptionValueName, OptionLabelName>
) => {
  const {
    ReadView,
    EditView,
    state = "edit",
    name,
    optionValueName,
    optionLabelName,
    noValueMessage,
    helperText,
    label,
    required,
    formMethods: propFormMethods,
    valueMapping,
    valueMappingOverride,
    options,
    tooltipProps,
    size,
  } = props;

  const formMethods = propFormMethods ?? useFormContext();

  const readViewProps: Omit<
    RadioInputReadViewProps<OptionValueName, OptionLabelName>,
    "fieldProps"
  > = {
    storedValue: formMethods.getValues(name),
    optionValueName,
    optionLabelName,
    noValueMessage,
    valueMapping,
    valueMappingOverride,
    options,
  };

  const editViewProps: Omit<
    RadioInputEditViewProps<TData, OptionValueName, OptionLabelName>,
    "fieldProps"
  > = {
    ...omit(props, [
      "EditView",
      "ReadView",
      "state",
      "noValueMessage",
      "label",
      "tooltipProps",
    ]),
    formMethods,
  };

  const ReadViewInput = (
    inputRef: Ref<HTMLElement | null>,
    fieldProps: FieldAria["fieldProps"]
  ) =>
    ReadView ? (
      <ReadView {...readViewProps} ref={inputRef} fieldProps={fieldProps} />
    ) : (
      <RadioInputReadView<OptionValueName, OptionLabelName>
        {...readViewProps}
        ref={inputRef}
        fieldProps={fieldProps}
      />
    );

  const EditViewInput = (
    inputRef: Ref<HTMLElement | null>,
    fieldProps: FieldAria["fieldProps"]
  ) =>
    EditView ? (
      <EditView {...editViewProps} ref={inputRef} fieldProps={fieldProps} />
    ) : (
      <RadioInputEditView
        {...editViewProps}
        ref={inputRef}
        fieldProps={fieldProps}
      />
    );

  // Remove things like description, error message, etc from read view
  const fieldProps: Partial<FieldProps> =
    state === "edit"
      ? {
          description: helperText,
          label,
          isInvalid: !!formMethods.formState.errors[name],
          errorMessage: formMethods.formState.errors[name]?.message as string,
          required,
          tooltipProps,
          size,
        }
      : {
          label,
          size,
        };

  return (
    <Field {...fieldProps}>
      {(inputRef, fieldProps) =>
        state === "read"
          ? ReadViewInput(inputRef, fieldProps)
          : EditViewInput(inputRef, fieldProps)
      }
    </Field>
  );
};

export default RadioInputField;
