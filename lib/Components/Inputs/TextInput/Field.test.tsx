import { render, screen } from "@testing-library/react";
import TextInputField, { TextInputFieldProps } from "./Field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forwardRef } from "react";

const FieldWrapper = (props: TextInputFieldProps<{ userText: string }>) => {
  const formSchema = z.object({
    userText: z.string(),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userText: undefined,
    },
  });
  methods.formState = {
    ...methods.formState,
    errors: {
      userText: { type: "minLength" },
    },
  };

  return (
    <FormProvider {...methods}>
      <TextInputField {...props} />
    </FormProvider>
  );
};

describe("Inputs/TextInput/Field", () => {
  const textInputFieldProps: TextInputFieldProps<{ userText: string }> = {
    label: "Write some text",
    name: "userText",
    placeholder: "Write some text",
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
  };

  it("textInputField should render with edit state", async () => {
    render(<FieldWrapper {...textInputFieldProps} />);
    expect(screen.getByPlaceholderText("Write some text")).toBeInTheDocument();
  });

  it("textInputField should render with alternative editView", async () => {
    render(
      <FieldWrapper
        {...textInputFieldProps}
        EditView={forwardRef(() => (
          <>Other Edit View</>
        ))}
      />
    );
    expect(screen.getByText("Other Edit View")).toBeInTheDocument();
  });

  it("textInputField should render in read state", async () => {
    render(<FieldWrapper {...textInputFieldProps} state="read" />);
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("textInputField should render with alternative ReadView", async () => {
    render(
      <FieldWrapper
        {...textInputFieldProps}
        state="read"
        ReadView={forwardRef(() => (
          <>Other Read View</>
        ))}
      />
    );
    expect(screen.getByText("Other Read View")).toBeInTheDocument();
  });
});
