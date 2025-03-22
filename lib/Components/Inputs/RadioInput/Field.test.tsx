import { render, screen } from "@testing-library/react";
import RadioInputField, { RadioInputFieldProps } from "./Field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SelectOption } from "../../..";
import { forwardRef } from "react";

const FieldWrapper = (
  props: RadioInputFieldProps<
    {
      radioOption: {
        label: string;
        value: string;
      };
    },
    "value",
    "label"
  >
) => {
  const formSchema = z.object({
    radioOption: z
      .object({
        label: z.string(),
        value: z.string(),
      })
      .passthrough(),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radioOption: undefined,
    },
  });

  methods.formState = {
    ...methods.formState,
    errors: {
      radioOption: { type: "invalid_type" } as any,
    },
  };

  return (
    <FormProvider {...methods}>
      <RadioInputField {...props} />
    </FormProvider>
  );
};

describe("Inputs/RadioInput/Field", async () => {
  const exampleOptions: SelectOption[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ];

  const radioInputFieldProps: RadioInputFieldProps<
    {
      radioOption: {
        label: string;
        value: string;
      };
    },
    "value",
    "label"
  > = {
    label: "Choose an option",
    name: "radioOption",
    options: exampleOptions,
    size: "md",
    onChange: () => undefined,
    onBlur: () => undefined,
    state: "edit",
    readOnly: false,
    disabled: false,
    required: true,
    optionValueName: "value",
    optionLabelName: "label",
    helperText: "Please select an option",
    // tooltip: {
    //   content: "This is a tooltip",
    //   Icon: <button>Info</button>,
    //   defaultIconProps: { color: "blue" },
    // },
  };

  it("RadioInputField should render with edit state", async () => {
    render(<FieldWrapper {...radioInputFieldProps} />);
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
  });

  it("RadioInputField should render with alternative editView", async () => {
    render(
      <FieldWrapper
        {...radioInputFieldProps}
        EditView={forwardRef(() => (
          <>Other Edit View</>
        ))}
      />
    );
    expect(screen.getByText("Other Edit View")).toBeInTheDocument();
  });

  it("RadioInputField should render in read state", async () => {
    render(<FieldWrapper {...radioInputFieldProps} state="read" />);
    expect(screen.getByText("None Selected")).toBeInTheDocument();
  });

  it("RadioInputField should render with alternative ReadView", async () => {
    render(
      <FieldWrapper
        {...radioInputFieldProps}
        state="read"
        ReadView={forwardRef(() => (
          <>Other Read View</>
        ))}
      />
    );
    expect(screen.getByText("Other Read View")).toBeInTheDocument();
  });
});
