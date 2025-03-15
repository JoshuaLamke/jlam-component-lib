import { forwardRef, Ref } from "react";
import { FieldAria } from "react-aria";

export interface NumberInputReadViewProps {
  inputValue?: number;
  noValueMessage?: string;
  fieldProps: FieldAria["fieldProps"];
}

const NumberInputReadViewInner = (
  { inputValue, noValueMessage, fieldProps }: NumberInputReadViewProps,
  inputRef: Ref<HTMLElement | null>
) => {
  return (
    <div
      {...fieldProps}
      ref={inputRef as Ref<HTMLDivElement | null>}
      className="text-gray-700"
    >
      {sanitizeNumber(inputValue) || noValueMessage || "None"}
    </div>
  );
};

const sanitizeNumber = (number?: Number) => {
  // If the number exists and is not NaN or undefined, stringify
  if (number || number === 0) {
    return String(number);
  }

  return undefined;
};

const NumberInputReadView = forwardRef(NumberInputReadViewInner);

export default NumberInputReadView;
