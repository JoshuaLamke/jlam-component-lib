import { Replacement } from "@react-input/mask";
import MaskedTextInputField, {
  InputMaskOptions,
  MaskedTextInputFieldProps,
} from "../Field";
import { FieldValues } from "react-hook-form";

export type PhoneNumberMaskFormatsTypes =
  | "Standard (With Parentheses)"
  | "International (With Country Code)"
  | "Dashed (No Parentheses)";

export const getPhoneNumberMaskFormatOptions = (
  countryCode?: string
): Record<
  PhoneNumberMaskFormatsTypes,
  { mask: string; replacement: Replacement }
> => ({
  "Standard (With Parentheses)": {
    mask: "(___) ___ ____",
    replacement: {
      _: /\d/,
    },
  },
  "International (With Country Code)": {
    mask: `${countryCode && `+${countryCode} `}(___) ___ ____`,
    replacement: {
      _: /\d/,
    },
  },
  "Dashed (No Parentheses)": {
    mask: "___-___-____",
    replacement: {
      _: /\d/,
    },
  },
});

export interface PhoneNumberInputFieldProps<TData extends FieldValues>
  extends Omit<MaskedTextInputFieldProps<TData>, "maskOptions"> {
  maskOptions: Omit<InputMaskOptions, "mask" | "replacement">;
  countryCode?: string;
  phoneNumberFormat?: PhoneNumberMaskFormatsTypes;
}

const PhoneNumberInputField = <TData extends FieldValues = FieldValues>({
  maskOptions,
  countryCode,
  phoneNumberFormat,
  ...props
}: PhoneNumberInputFieldProps<TData>) => {
  return (
    <MaskedTextInputField<TData>
      {...props}
      maskOptions={{
        ...maskOptions,
        ...getPhoneNumberMaskFormatOptions(countryCode)[
          phoneNumberFormat ?? "Dashed (No Parentheses)"
        ],
      }}
    />
  );
};

export default PhoneNumberInputField;
