import { ReactNode, Ref, useRef } from "react";
import { AriaFieldProps, FieldAria, useField } from "react-aria";
import { TooltipButton, TooltipButtonProps } from "../../../";

export interface FieldProps extends AriaFieldProps {
  children: (
    inputRef: Ref<HTMLElement | null>,
    fieldProps: FieldAria["fieldProps"]
  ) => ReactNode;
  errorMessage?: ReactNode;
  required?: boolean;
  tooltipProps?: TooltipButtonProps;
}

const Field = (props: FieldProps) => {
  const {
    description,
    errorMessage,
    isInvalid,
    label,
    required,
    children,
    tooltipProps,
  } = props;
  const { descriptionProps, errorMessageProps, fieldProps, labelProps } =
    useField(props);
  const inputRef = useRef<HTMLElement>(null);

  return (
    <div className="flex flex-col">
      {label && (
        <label
          {...labelProps}
          className="text-sm font-semibold mb-1 flex items-center"
        >
          {label}
          {required && <span className="text-red-500 mx-1">*</span>}
          {tooltipProps && <TooltipButton className="ms-1" {...tooltipProps} />}
        </label>
      )}
      {children(inputRef, fieldProps)}
      {description && (
        <div {...descriptionProps} className="text-xs mt-0.5 text-gray-700">
          {description}
        </div>
      )}
      {isInvalid && (
        <div className="text-red-500 text-xs mt-0.5" {...errorMessageProps}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Field;
