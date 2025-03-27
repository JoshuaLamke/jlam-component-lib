import {
  useFormContext,
  UseFormReturn,
  FieldValues,
  Path,
} from "react-hook-form";
import TextInputReadView, { TextInputReadViewProps } from "./ReadView";
import TextInputEditView, { TextInputEditViewProps } from "./EditView";
import { Field, FieldProps, omit, TooltipButtonProps } from "../../../";
import { FieldAria } from "react-aria";
import {
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
  RefAttributes,
} from "react";

export interface TextInputFieldProps<TData extends FieldValues> {
  label?: ReactNode;
  name: Path<TData>;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | "xl";
  onChange?: (val: string) => void;
  onBlur?: () => void;
  state?: "read" | "edit";
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  helperText?: ReactNode;
  ReadView?: ForwardRefExoticComponent<
    TextInputReadViewProps & RefAttributes<HTMLElement>
  >;
  EditView?: ForwardRefExoticComponent<
    TextInputEditViewProps<TData> & RefAttributes<HTMLElement>
  >;
  noValueMessage?: string;
  formMethods?: UseFormReturn<TData>;
  tooltipProps?: TooltipButtonProps;
}

const TextInputField = <TData extends FieldValues = FieldValues>(
  props: TextInputFieldProps<TData>
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
  } = props;

  const formMethods = propFormMethods ?? useFormContext();

  const readViewProps: Omit<TextInputReadViewProps, "fieldProps"> = {
    inputValue: formMethods.getValues(name),
    noValueMessage,
  };

  const editViewProps: Omit<TextInputEditViewProps<TData>, "fieldProps"> = {
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
      <TextInputReadView
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
      <TextInputEditView
        {...editViewProps}
        ref={inputRef}
        fieldProps={fieldProps}
      />
    );

  // Remove things like description, error message, tooltip, etc from read view
  const fieldProps: Partial<FieldProps> =
    state === "edit"
      ? {
          description: helperText,
          label,
          isInvalid: !!formMethods.formState.errors[name],
          errorMessage: formMethods.formState.errors[name]?.message as string,
          required,
          tooltipProps,
        }
      : {
          label,
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

export default TextInputField;
