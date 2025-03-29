import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { NumberInputFieldProps } from "./Field";
import { FieldAria, useNumberField } from "react-aria";
import { forwardRef, Ref, RefObject } from "react";
import { useNumberFieldState } from "react-stately";
import { sizeStyleMap } from "../../../";

export interface NumberInputEditViewProps<TData extends FieldValues>
  extends Omit<
    NumberInputFieldProps<TData>,
    | "ReadView"
    | "EditView"
    | "state"
    | "noValueMessage"
    | "formMethods"
    | "helperText"
    | "label"
    | "tooltipProps"
  > {
  formMethods: UseFormReturn<TData>;
  fieldProps: FieldAria["fieldProps"];
}

const NumberInputEditViewInner = <TData extends FieldValues = FieldValues>(
  {
    name,
    placeholder,
    size = "md",
    onChange,
    onBlur,
    formMethods,
    required,
    disabled,
    readOnly,
    fieldProps,
    minValue,
    maxValue,
    formatOptions,
  }: NumberInputEditViewProps<TData>,
  inputRef: Ref<HTMLInputElement>
) => {
  const {
    formState: { errors },
    control,
  } = formMethods;

  const isInvalid = !!errors[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const compositeOnChange = (value: number) => {
          onChange?.(value);
          field.onChange(value);
        };
        const compositeOnBlur = () => {
          onBlur?.();
          field.onBlur();
        };

        const state = useNumberFieldState({
          onChange: compositeOnChange,
          onBlur: compositeOnBlur,
          isDisabled: disabled,
          isReadOnly: readOnly,
          isRequired: required,
          isInvalid: isInvalid,
          placeholder,
          locale: "en-US",
          value: field.value ?? NaN,
          maxValue,
          minValue,
          formatOptions,
          ...fieldProps,
        });

        const { inputProps: numberInputProps } = useNumberField(
          {
            onChange: compositeOnChange,
            onBlur: compositeOnBlur,
            isDisabled: disabled,
            isReadOnly: readOnly,
            isRequired: required,
            isInvalid: isInvalid,
            placeholder,
            value: field.value,
            ...fieldProps,
          },
          state,
          inputRef as RefObject<HTMLInputElement | null>
        );

        return (
          <input
            {...numberInputProps}
            className={`
              ${sizeStyleMap[size].inputHeight}
              ${sizeStyleMap[size].inputFontSize}
              rounded-md py-1 px-2 outline 
              focus:ring-[1.5px]
              disabled:bg-gray-200 read-only:bg-gray-200
              ${
                isInvalid
                  ? "outline-red-400 focus:ring-red-600 focus:outline-red-600 hover:outline-red-500"
                  : "outline-gray-300 focus:ring-black focus:outline-black hover:outline-gray-700"
              }
            `}
          />
        );
      }}
    />
  );
};

const NumberInputEditView = forwardRef(NumberInputEditViewInner) as <
  TData extends FieldValues = FieldValues
>(
  props: NumberInputEditViewProps<TData> & {
    ref?: Ref<HTMLElement | null>;
  }
) => ReturnType<typeof NumberInputEditViewInner>;

export default NumberInputEditView;
