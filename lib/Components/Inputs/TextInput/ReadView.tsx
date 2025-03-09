import { forwardRef, Ref } from "react";
import { FieldAria } from "react-aria";

export interface TextInputReadViewProps {
  inputValue: string;
  noValueMessage?: string;
  fieldProps: FieldAria["fieldProps"];
}

const TextInputReadViewInner = (
  { inputValue, noValueMessage, fieldProps }: TextInputReadViewProps,
  inputRef: Ref<HTMLElement | null>
) => {
  return (
    <div
      {...fieldProps}
      ref={inputRef as Ref<HTMLDivElement | null>}
      className="text-gray-700"
    >
      {inputValue || noValueMessage || "None"}
    </div>
  );
};

const TextInputReadView = forwardRef(TextInputReadViewInner);

export default TextInputReadView;
