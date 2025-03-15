import { render, screen } from "@testing-library/react";
import SSNInputField, { SSNInputFieldProps } from "./Field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FieldWrapper = (props: SSNInputFieldProps<{ ssn: string }>) => {
  const formSchema = z.object({
    ssn: z.string(),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ssn: undefined,
    },
  });
  return (
    <FormProvider {...methods}>
      <SSNInputField {...props} />
    </FormProvider>
  );
};

describe("Inputs/MaskedTextInput/SSNInput/Field", () => {
  const maskedTextInputFieldProps: SSNInputFieldProps<{ ssn: string }> = {
    label: "Write SSN",
    name: "ssn",
    size: "md",
    onChange: (val) => console.log(val),
    onBlur: () => console.log("Field blurred"),
    state: "edit",
    readOnly: false,
    disabled: false,
    required: true,
    helperText: "Please write SSN",
    // tooltip: {
    //   content: "This is a tooltip",
    //   Icon: <button>Info</button>,
    //   defaultIconProps: { color: "blue" },
    // },
    maskOptions: {
      showMask: true,
    },
  };

  it("SSNInputField should render correctly in edit state", async () => {
    render(<FieldWrapper {...maskedTextInputFieldProps} />);
    expect(screen.getByText("Write SSN")).toBeInTheDocument();
  });

  it("SSNInputField should render in read state", async () => {
    render(<FieldWrapper {...maskedTextInputFieldProps} state="read" />);
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("SSNInputField should render correct mask", async () => {
    render(
      <FieldWrapper
        {...maskedTextInputFieldProps}
        maskOptions={{
          showMask: true,
        }}
      />
    );
    const ssnInput = screen.getByRole("textbox");
    expect(ssnInput).toHaveValue("___-__-____");
  });
});
