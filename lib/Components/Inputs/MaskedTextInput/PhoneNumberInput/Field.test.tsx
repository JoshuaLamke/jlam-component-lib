import { render, screen } from "@testing-library/react";
import PhoneNumberInputField, { PhoneNumberInputFieldProps } from "./Field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FieldWrapper = (props: PhoneNumberInputFieldProps<{ phone: string }>) => {
  const formSchema = z.object({
    phone: z.string(),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: undefined,
    },
  });
  return (
    <FormProvider {...methods}>
      <PhoneNumberInputField {...props} />
    </FormProvider>
  );
};

describe("Inputs/MaskedTextInput/PhoneNumberInput/Field", () => {
  const maskedTextInputFieldProps: PhoneNumberInputFieldProps<{
    phone: string;
  }> = {
    label: "Write phone number",
    name: "phone",
    size: "md",
    onChange: (val) => console.log(val),
    onBlur: () => console.log("Field blurred"),
    state: "edit",
    readOnly: false,
    disabled: false,
    required: true,
    helperText: "Please write phone number",
    // tooltip: {
    //   content: "This is a tooltip",
    //   Icon: <button>Info</button>,
    //   defaultIconProps: { color: "blue" },
    // },
    maskOptions: {
      showMask: true,
    },
  };

  it("PhoneNumberInputField should render correctly in edit state", async () => {
    render(<FieldWrapper {...maskedTextInputFieldProps} />);
    expect(screen.getByText("Write phone number")).toBeInTheDocument();
  });

  it("PhoneNumberInputField should render in read state", async () => {
    render(<FieldWrapper {...maskedTextInputFieldProps} state="read" />);
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("PhoneNumberInputField should render correct mask with country code for international format", async () => {
    render(
      <FieldWrapper
        {...maskedTextInputFieldProps}
        countryCode="44"
        phoneNumberFormat="International (With Country Code)"
        maskOptions={{
          showMask: true,
        }}
      />
    );
    const phoneNumberInput = screen.getByRole("textbox");
    expect(phoneNumberInput).toHaveValue("+44 (___) ___ ____");
  });

  it("PhoneNumberInputField should render correct mask for standard format", async () => {
    render(
      <FieldWrapper
        {...maskedTextInputFieldProps}
        countryCode="44"
        phoneNumberFormat="Standard (With Parentheses)"
        maskOptions={{
          showMask: true,
        }}
      />
    );
    const phoneNumberInput = screen.getByRole("textbox");
    expect(phoneNumberInput).toHaveValue("(___) ___ ____");
  });

  it("PhoneNumberInputField should render correct mask for dashed default format", async () => {
    render(
      <FieldWrapper
        {...maskedTextInputFieldProps}
        maskOptions={{
          showMask: true,
        }}
      />
    );
    const phoneNumberInput = screen.getByRole("textbox");
    expect(phoneNumberInput).toHaveValue("___-___-____");
  });
});
