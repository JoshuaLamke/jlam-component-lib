import { render, screen } from "@testing-library/react";
import MaskedTextInputField, { MaskedTextInputFieldProps } from "./Field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forwardRef } from "react";

const FieldWrapper = (
  props: MaskedTextInputFieldProps<{ maskedUserText: string }>
) => {
  const formSchema = z.object({
    maskedUserText: z.string(),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maskedUserText: undefined,
    },
  });

  methods.formState = {
    ...methods.formState,
    errors: {
      maskedUserText: { type: "min_length" },
    },
  };

  return (
    <FormProvider {...methods}>
      <MaskedTextInputField {...props} />
    </FormProvider>
  );
};

describe("Inputs/MaskedTextInput/Field", () => {
  const maskedTextInputFieldProps: MaskedTextInputFieldProps<{
    maskedUserText: string;
  }> = {
    label: "Write some masked text",
    name: "maskedUserText",
    size: "md",
    onChange: (val) => console.log(val),
    onBlur: () => console.log("Field blurred"),
    state: "edit",
    readOnly: false,
    disabled: false,
    required: true,
    helperText: "Please write some text",
    // tooltip: {
    //   content: "This is a tooltip",
    //   Icon: <button>Info</button>,
    //   defaultIconProps: { color: "blue" },
    // },
    maskOptions: {
      mask: "___ __ ____",
      replacement: {
        _: /\d/,
      },
      showMask: true,
    },
  };

  it("maskedTextInputField should render with edit state", async () => {
    render(<FieldWrapper {...maskedTextInputFieldProps} />);
    expect(screen.getByText("Write some masked text")).toBeInTheDocument();
  });

  it("maskedTextInputField should render with alternative editView", async () => {
    render(
      <FieldWrapper
        {...maskedTextInputFieldProps}
        EditView={forwardRef(() => (
          <>Other Edit View</>
        ))}
      />
    );
    expect(screen.getByText("Other Edit View")).toBeInTheDocument();
  });

  it("maskedTextInputField should render in read state", async () => {
    render(<FieldWrapper {...maskedTextInputFieldProps} state="read" />);
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("maskedTextInputField should render with alternative ReadView", async () => {
    render(
      <FieldWrapper
        {...maskedTextInputFieldProps}
        state="read"
        ReadView={forwardRef(() => (
          <>Other Read View</>
        ))}
      />
    );
    expect(screen.getByText("Other Read View")).toBeInTheDocument();
  });
});
