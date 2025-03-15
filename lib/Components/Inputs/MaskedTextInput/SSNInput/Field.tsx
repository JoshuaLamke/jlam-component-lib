import { FieldValues } from "react-hook-form";
import MaskedTextInputField, {
  InputMaskOptions,
  MaskedTextInputFieldProps,
} from "../Field";

export interface SSNInputFieldProps<TData extends FieldValues>
  extends Omit<MaskedTextInputFieldProps<TData>, "maskOptions"> {
  maskOptions: Omit<InputMaskOptions, "mask" | "replacement">;
}

const SSNInputField = <TData extends FieldValues = FieldValues>({
  maskOptions,
  ...props
}: SSNInputFieldProps<TData>) => {
  return (
    <MaskedTextInputField<TData>
      {...props}
      maskOptions={{
        ...maskOptions,
        mask: "___-__-____",
        replacement: { _: /\d/ },
      }}
    />
  );
};

export default SSNInputField;
