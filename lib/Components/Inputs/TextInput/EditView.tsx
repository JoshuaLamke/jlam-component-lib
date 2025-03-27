import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { TextInputFieldProps } from "./Field";
import { FieldAria, useTextField } from "react-aria";
import { forwardRef, Ref, RefObject } from "react";

export interface TextInputEditViewProps<TData extends FieldValues>
  extends Omit<
    TextInputFieldProps<TData>,
    | "EditView"
    | "ReadView"
    | "state"
    | "noValueMessage"
    | "helperText"
    | "label"
    | "tooltipProps"
  > {
  formMethods: UseFormReturn<TData>;
  fieldProps: FieldAria["fieldProps"];
}

const TextInputEditViewInner = <TData extends FieldValues = FieldValues>(
  {
    name,
    placeholder,
    size,
    onChange,
    onBlur,
    formMethods,
    disabled,
    readOnly,
    required,
    fieldProps,
  }: TextInputEditViewProps<TData>,
  inputRef: Ref<HTMLElement | null>
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
        const compositeOnChange = (value: string) => {
          onChange?.(value);
          field.onChange(value);
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
            placeholder,
            value: field.value ?? "",
            type: "text",
            ...fieldProps,
          },
          inputRef as RefObject<HTMLInputElement | null>
        );

        return (
          <input
            {...textInputProps}
            className={`
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

const TextInputEditView = forwardRef(TextInputEditViewInner) as <
  TData extends FieldValues = FieldValues
>(
  props: TextInputEditViewProps<TData> & {
    ref?: Ref<HTMLElement | null>;
  }
) => ReturnType<typeof TextInputEditViewInner>;

export default TextInputEditView;
