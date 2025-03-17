import {
  FieldValues,
  Path,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import MaskedTextInputReadView, {
  MaskedTextInputReadViewProps,
} from "./ReadView";
import MaskedTextInputEditView, {
  MaskedTextInputEditViewProps,
} from "./EditView";
import { Field, FieldProps, omit } from "../../../";
import { InputMaskProps, Replacement } from "@react-input/mask";
import { FieldAria } from "react-aria";
import {
  ForwardRefExoticComponent,
  ReactNode,
  Ref,
  RefAttributes,
} from "react";

export interface InputMaskOptions extends InputMaskProps {
  mask: string;
  replacement: string | Replacement;
}

export interface MaskedTextInputFieldProps<TData extends FieldValues> {
  label?: ReactNode;
  name: Path<TData>;
  maskOptions: InputMaskOptions;
  size?: "sm" | "md" | "lg" | "xl";
  onChange?: (val: string) => void;
  onBlur?: () => void;
  state?: "read" | "edit";
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  // tooltip?: {
  //   content: ReactNode;
  //   Icon?: React.ReactElement<HTMLButtonElement>;
  //   defaultIconProps?: DefaultTipIconProps;
  //   tooltipProps?: Omit<TooltipProps, "children" | "content">;
  // };
  ReadView?: ForwardRefExoticComponent<
    MaskedTextInputReadViewProps & RefAttributes<HTMLElement>
  >;
  EditView?: ForwardRefExoticComponent<
    MaskedTextInputEditViewProps<TData> & RefAttributes<HTMLElement>
  >;
  noValueMessage?: string;
  formMethods?: UseFormReturn<TData>;
}

const MaskedTextInputField = <TData extends FieldValues = FieldValues>(
  props: MaskedTextInputFieldProps<TData>
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
    maskOptions,
  } = props;

  const formMethods = propFormMethods ?? useFormContext();

  const readViewProps: Omit<MaskedTextInputReadViewProps, "fieldProps"> = {
    inputValue: formMethods.getValues(name),
    noValueMessage,
    maskOptions,
  };

  const editViewProps: Omit<
    MaskedTextInputEditViewProps<TData>,
    "fieldProps"
  > = {
    ...omit(props, [
      "ReadView",
      "EditView",
      "state",
      "noValueMessage",
      "formMethods",
      "helperText",
      "label",
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
      <MaskedTextInputReadView
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
      <MaskedTextInputEditView
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

export default MaskedTextInputField;
