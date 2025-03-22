import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { omit, SelectOption } from "../../../";
import RadioInputEditView, { RadioInputEditViewProps } from "./EditView";
import userEvent from "@testing-library/user-event";

vi.mock("react-aria", async (): Promise<typeof import("react-aria")> => {
  const actual = await import("react-aria");
  return {
    ...actual,
    useFocusRing: () => ({
      isFocusVisible: true,
      focusProps: {},
      isFocused: true,
    }),
  };
});

const RadioInputEditViewWrapper = <
  D extends FieldValues = FieldValues,
  V extends string = "value",
  L extends string = "label"
>(
  props: Omit<RadioInputEditViewProps<D, V, L>, "formMethods"> & {
    onValidFn?: SubmitHandler<{ radioOption?: any }>;
    onInvalidFn?: (errors: FieldErrors<D>) => undefined;
    defaultValue?: any;
    validation?: z.ZodType;
  }
) => {
  const schema =
    props.validation ??
    z
      .object(
        {
          label: z.string(),
          value: z.string(),
        },
        { message: "Must select an option." }
      )
      .passthrough();

  const formSchema = z.object({
    radioOption: schema,
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      radioOption: props.defaultValue ?? undefined,
    },
  });
  return (
    <form
      noValidate
      onSubmit={methods.handleSubmit(props.onValidFn!, props.onInvalidFn)}
    >
      <RadioInputEditView<D, V, L>
        {...omit(props, ["onInvalidFn", "onValidFn", "defaultValue"])}
        formMethods={methods as unknown as UseFormReturn<D>}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe("Inputs/RadioInput/EditView", () => {
  const exampleOptions: SelectOption[] = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ];

  const radioinputFieldProps: Omit<
    RadioInputEditViewProps<
      { radioOption: { value: string; label: string } },
      "value",
      "label"
    >,
    "formMethods"
  > = {
    fieldProps: {
      "aria-label": "radio-group",
    },
    name: "radioOption",
    options: exampleOptions,
    onChange: (_val) => undefined,
    onBlur: () => undefined,
    readOnly: false,
    disabled: false,
    required: true,
    optionValueName: "value",
    optionLabelName: "label",
  };

  it("RadioInputEditView should render correctly", async () => {
    render(<RadioInputEditViewWrapper {...radioinputFieldProps} />);
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio").length).toBe(2);
  });

  it("RadioInputEditView should select properly", async () => {
    const mockOnChange = vi.fn();
    render(
      <RadioInputEditViewWrapper
        {...radioinputFieldProps}
        onChange={mockOnChange}
      />
    );

    const radioInput1 = screen.getByLabelText("Option 1");
    const radioInput2 = screen.getByLabelText("Option 2");

    await userEvent.click(radioInput1);
    expect(mockOnChange).toHaveBeenCalledWith({
      value: "1",
      label: "Option 1",
    });

    await userEvent.click(radioInput2);
    expect(mockOnChange).toHaveBeenCalledWith({
      value: "2",
      label: "Option 2",
    });
  });

  it("RadioInputEditView should not select when readonly or disabled", async () => {
    const mockOnChange = vi.fn();
    const { rerender } = render(
      <RadioInputEditViewWrapper
        {...radioinputFieldProps}
        onChange={mockOnChange}
        readOnly
      />
    );

    const radioInputReadonly1 = screen.getByLabelText("Option 1");
    const radioInputReadonly2 = screen.getByLabelText("Option 2");

    await userEvent.click(radioInputReadonly1);
    expect(mockOnChange).not.toHaveBeenCalled();

    await userEvent.click(radioInputReadonly2);
    expect(mockOnChange).not.toHaveBeenCalled();

    rerender(
      <RadioInputEditViewWrapper
        {...radioinputFieldProps}
        onChange={mockOnChange}
        disabled
      />
    );

    const radioInputDisabled1 = screen.getByLabelText("Option 1");
    const radioInputDisabled2 = screen.getByLabelText("Option 2");

    await userEvent.click(radioInputDisabled1);
    expect(mockOnChange).not.toHaveBeenCalled();

    await userEvent.click(radioInputDisabled2);
    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it("RadioInputEditView should clear and submit properly for object mapping", async () => {
    const mockOnChange = vi.fn();
    const mockOnValid = vi.fn();
    render(
      <RadioInputEditViewWrapper
        {...radioinputFieldProps}
        onChange={mockOnChange}
        onValidFn={mockOnValid}
      />
    );

    const radioInput1 = screen.getByLabelText("Option 1");
    const radioInput2 = screen.getByLabelText("Option 2");
    const submitButton = screen.getByText("Submit");

    fireEvent.keyDown(radioInput1, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        value: "1",
        label: "Option 1",
      });
    });

    fireEvent.keyDown(radioInput1, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(null);
    });

    fireEvent.keyDown(radioInput2, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        value: "2",
        label: "Option 2",
      });
    });

    await userEvent.click(submitButton);

    expect(mockOnValid).toHaveBeenCalled();
    expect(mockOnValid.mock.calls[0][0]).to.deep.equal({
      radioOption: {
        value: "2",
        label: "Option 2",
      },
    });
  });

  it("RadioInputEditView should clear and submit properly for string mapping", async () => {
    const mockOnChange = vi.fn();
    const mockOnValid = vi.fn();
    render(
      <RadioInputEditViewWrapper
        {...radioinputFieldProps}
        onChange={mockOnChange}
        onValidFn={mockOnValid}
        validation={z.string()}
        valueMapping="stringValue"
      />
    );

    const radioInput1 = screen.getByLabelText("Option 1");
    const radioInput2 = screen.getByLabelText("Option 2");
    const submitButton = screen.getByText("Submit");

    fireEvent.keyDown(radioInput1, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("1");
    });

    fireEvent.keyDown(radioInput1, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(null);
    });

    fireEvent.keyDown(radioInput2, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("2");
    });

    await userEvent.click(submitButton);

    expect(mockOnValid).toHaveBeenCalled();
    expect(mockOnValid.mock.calls[0][0]).to.deep.equal({
      radioOption: "2",
    });
  });

  it("RadioInputEditView should clear and submit properly for boolean mapping", async () => {
    const mockOnChange = vi.fn();
    const mockOnValid = vi.fn();
    render(
      <RadioInputEditViewWrapper
        {...radioinputFieldProps}
        options={[
          { label: "Option 1", value: "true" },
          { label: "Option 2", value: "false" },
        ]}
        valueMapping="booleanValue"
        onChange={mockOnChange}
        onValidFn={mockOnValid}
        validation={z.boolean()}
      />
    );

    const radioInput1 = screen.getByLabelText("Option 1");
    const radioInput2 = screen.getByLabelText("Option 2");
    const submitButton = screen.getByText("Submit");

    fireEvent.keyDown(radioInput1, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(true);
    });

    fireEvent.keyDown(radioInput1, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(null);
    });

    fireEvent.keyDown(radioInput2, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(false);
    });

    await userEvent.click(submitButton);

    expect(mockOnValid).toHaveBeenCalled();
    expect(mockOnValid.mock.calls[0][0]).to.deep.equal({
      radioOption: false,
    });
  });

  it("RadioInputEditView should clear and submit properly for valueMappingOverride", async () => {
    const mockOnChange = vi.fn();
    const mockOnValid = vi.fn();
    render(
      <RadioInputEditViewWrapper
        {...radioinputFieldProps}
        options={[
          { label: "Option 1", value: "opt1" },
          { label: "Option 2", value: "opt2" },
        ]}
        valueMappingOverride={() => {
          return {
            formatFromStoredValToDisplayVal(storedVal) {
              return (storedVal as string)?.toLowerCase();
            },
            formatFromStoredValToRadioVal(storedVal) {
              if (!storedVal) {
                return null;
              }
              return (storedVal as string)?.toLowerCase();
            },
            formatFromRadioValToStoredVal(radioInputValue) {
              if (!radioInputValue) {
                return null;
              }
              return (radioInputValue as string)?.toUpperCase();
            },
          };
        }}
        onChange={mockOnChange}
        onValidFn={mockOnValid}
        validation={z.string()}
      />
    );

    const radioInput1 = screen.getByLabelText("Option 1");
    const radioInput2 = screen.getByLabelText("Option 2");
    const submitButton = screen.getByText("Submit");

    fireEvent.keyDown(radioInput1, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("OPT1");
    });

    fireEvent.keyDown(radioInput1, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(null);
    });

    fireEvent.keyDown(radioInput2, { key: " ", code: "Space", keyCode: 32 });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith("OPT2");
    });

    await userEvent.click(submitButton);

    expect(mockOnValid).toHaveBeenCalled();
    expect(mockOnValid.mock.calls[0][0]).to.deep.equal({
      radioOption: "OPT2",
    });
  });
});
