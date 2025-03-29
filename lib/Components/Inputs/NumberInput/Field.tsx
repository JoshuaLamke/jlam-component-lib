import {
  FieldValues,
  Path,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import NumberInputReadView, { NumberInputReadViewProps } from "./ReadView";
import NumberInputEditView, { NumberInputEditViewProps } from "./EditView";
import { Field, FieldProps, omit, Size, TooltipButtonProps } from "../../../";
import { ForwardRefExoticComponent, Ref, RefAttributes } from "react";
import { FieldAria } from "react-aria";

export interface NumberInputFieldProps<TData extends FieldValues> {
  label?: React.ReactNode;
  name: Path<TData>;
  placeholder?: string;
  size?: Size;
  onChange?: (val: number) => void;
  onBlur?: () => void;
  state?: "read" | "edit";
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  minValue?: number;
  maxValue?: number;
  formatOptions?: Intl.NumberFormatOptions;
  tooltipProps?: TooltipButtonProps;
  ReadView?: ForwardRefExoticComponent<
    NumberInputReadViewProps & RefAttributes<HTMLElement>
  >;
  EditView?: ForwardRefExoticComponent<
    NumberInputEditViewProps<TData> & RefAttributes<HTMLElement>
  >;
  noValueMessage?: string;
  formMethods?: UseFormReturn<TData>;
}

const NumberInputField = <TData extends FieldValues = FieldValues>(
  props: NumberInputFieldProps<TData>
) => {
  const {
    ReadView,
    EditView,
    formMethods: propFormMethods,
    name,
    label,
    noValueMessage,
    state = "edit",
    helperText,
    required,
    tooltipProps,
    size,
  } = props;

  const formMethods = propFormMethods ?? useFormContext();

  const readViewProps: Omit<NumberInputReadViewProps, "fieldProps"> = {
    inputValue: formMethods.getValues(name),
    noValueMessage,
  };

  const editViewProps: Omit<NumberInputEditViewProps<TData>, "fieldProps"> = {
    ...omit(props, [
      "ReadView",
      "EditView",
      "state",
      "noValueMessage",
      "formMethods",
      "helperText",
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
      <NumberInputReadView
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
      <NumberInputEditView
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

export default NumberInputField;
