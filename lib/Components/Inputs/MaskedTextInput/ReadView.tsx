import { InputMaskOptions } from "./Field";
import { format } from "../../../";
import { FieldAria } from "react-aria";
import { forwardRef, Ref } from "react";

export interface MaskedTextInputReadViewProps {
  inputValue: string;
  maskOptions: InputMaskOptions;
  noValueMessage?: string;
  fieldProps: FieldAria["fieldProps"];
}

const MaskedTextInputReadViewInner = (
  {
    inputValue = "",
    noValueMessage,
    maskOptions,
    fieldProps,
  }: MaskedTextInputReadViewProps,
  inputRef: Ref<HTMLElement | null>
) => {
  const formatInputValue = (inputValue: string) =>
    format(inputValue, {
      mask: maskOptions.mask,
      replacement: maskOptions.replacement,
      separate: maskOptions.separate,
      showMask: maskOptions.showMask,
    });

  const displayValue = inputValue
    ? formatInputValue(inputValue)
    : noValueMessage || "None";

  return (
    <div
      ref={inputRef as Ref<HTMLDivElement | null>}
      {...fieldProps}
      className="text-gray-700"
    >
      {displayValue}
    </div>
  );
};

const MaskedTextInputReadView = forwardRef(MaskedTextInputReadViewInner);

export default MaskedTextInputReadView;
