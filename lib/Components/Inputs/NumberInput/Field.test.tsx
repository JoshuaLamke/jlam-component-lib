import { render, screen } from "@testing-library/react";
import NumberInputField, { NumberInputFieldProps } from "./Field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forwardRef } from "react";

const FieldWrapper = (
  props: NumberInputFieldProps<{ userNumber?: number }>
) => {
  const formSchema = z.object({
    userNumber: z.number().optional(),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userNumber: undefined,
    },
  });

  methods.formState = {
    ...methods.formState,
    errors: {
      userNumber: { type: "invalid_type" },
    },
  };

  return (
    <FormProvider {...methods}>
      <NumberInputField {...props} />
    </FormProvider>
  );
};

describe("Inputs/NumberInput/Field", () => {
  const numberInputFieldProps: NumberInputFieldProps<{ userNumber?: number }> =
    {
      label: "Write some number",
      name: "userNumber",
      placeholder: "Write a number",
      size: "md",
      onChange: (val) => console.log(val),
      onBlur: () => console.log("Field blurred"),
      state: "edit",
      readOnly: false,
      disabled: false,
      required: true,
      helperText: "Please write a number",
      tooltipProps: {
        content: "This is a tooltip",
        Icon: <button>Info</button>,
      },
    };

  it("numberInputField should render with edit state", async () => {
    render(<FieldWrapper {...numberInputFieldProps} />);
    expect(screen.getByText("Write some number")).toBeInTheDocument();
  });

  it("numberInputField should render with alternative editView", async () => {
    render(
      <FieldWrapper
        {...numberInputFieldProps}
        EditView={forwardRef(() => (
          <>Other Edit View</>
        ))}
      />
    );
    expect(screen.getByText("Other Edit View")).toBeInTheDocument();
  });

  it("numberInputField should render in read state", async () => {
    render(<FieldWrapper {...numberInputFieldProps} state="read" />);
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("numberInputField should render with alternative ReadView", async () => {
    render(
      <FieldWrapper
        {...numberInputFieldProps}
        state="read"
        ReadView={forwardRef(() => (
          <>Other Read View</>
        ))}
      />
    );
    expect(screen.getByText("Other Read View")).toBeInTheDocument();
  });
});
