import { format, sizeStyleMap } from "../../../";
import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { MaskedTextInputFieldProps } from "./Field";
import { InputMask, Mask } from "@react-input/mask";
import { FieldAria, useTextField } from "react-aria";
import { forwardRef, Ref, RefObject } from "react";

export interface MaskedTextInputEditViewProps<TData extends FieldValues>
  extends Omit<
    MaskedTextInputFieldProps<TData>,
    | "ReadView"
    | "EditView"
    | "state"
    | "noValueMessage"
    | "formMethods"
    | "helperText"
    | "label"
  > {
  formMethods: UseFormReturn<TData>;
  fieldProps: FieldAria["fieldProps"];
}

const MaskedTextInputEditViewInner = <TData extends FieldValues = FieldValues>(
  {
    name,
    size = "md",
    onChange,
    onBlur,
    formMethods,
    required,
    maskOptions,
    fieldProps,
    disabled,
    readOnly,
  }: MaskedTextInputEditViewProps<TData>,
  inputRef: Ref<HTMLElement | null>
) => {
  const {
    formState: { errors },
    control,
  } = formMethods;

  const isInvalid = !!errors[name];

  const { unformat } = new Mask(maskOptions);
  const formatInputValue = (inputValue: string) =>
    format(inputValue, {
      mask: maskOptions.mask,
      replacement: maskOptions.replacement,
      separate: maskOptions.separate,
      showMask: maskOptions.showMask,
    });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const compositeOnChange = (value: string) => {
          const newValue = unformat(value);
          field.onChange(newValue);
          onChange?.(newValue);
        };
        const compositeOnBlur = () => {
          onBlur?.();
          field.onBlur();
        };

        const { inputProps: textInputProps } = useTextField(
          {
            onChange: compositeOnChange,
            onBlur: compositeOnBlur,
            isDisabled: disabled,
            isReadOnly: readOnly,
            isRequired: required,
            isInvalid: isInvalid,
            value: formatInputValue(field.value ?? ""),
            type: "text",
            ...fieldProps,
          },
          inputRef as RefObject<HTMLInputElement | null>
        );

        return (
          <InputMask
            {...maskOptions}
            {...textInputProps}
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

const MaskedTextInputEditView = forwardRef(MaskedTextInputEditViewInner) as <
  TData extends FieldValues = FieldValues
>(
  props: MaskedTextInputEditViewProps<TData> & {
    ref?: Ref<HTMLElement | null>;
  }
) => ReturnType<typeof MaskedTextInputEditViewInner>;

export default MaskedTextInputEditView;
