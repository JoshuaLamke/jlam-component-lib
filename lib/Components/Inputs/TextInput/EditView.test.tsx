import { getByPlaceholderText, render, screen } from "@testing-library/react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { omit } from "../../../";
import userEvent from "@testing-library/user-event";
import TextInputEditView, { TextInputEditViewProps } from "./EditView";
import { useRef } from "react";

const TextInputEditViewWrapper = (
  props: Omit<TextInputEditViewProps<{ userText: string }>, "formMethods"> & {
    onValidFn?: (data: any) => undefined;
    onInvalidFn?: (errors: FieldErrors<any>) => undefined;
    defaultValue?: string;
  }
) => {
  const formSchema = z.object({
    userText: z
      .string({ message: "need to input text" })
      .min(1, { message: "need to input text" }),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userText: undefined,
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      noValidate
      onSubmit={methods.handleSubmit(props.onValidFn!, props.onInvalidFn)}
    >
      <TextInputEditView
        {...omit(props, ["onInvalidFn", "onValidFn", "defaultValue"])}
        formMethods={methods}
        ref={ref}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe("Inputs/TextInput/EditView", () => {
  const textInputFieldProps: Omit<
    TextInputEditViewProps<{ userText: string }>,
    "formMethods"
  > = {
    name: "userText",
    placeholder: "Enter text...",
    size: "md",
    onChange: (_val) => undefined,
    onBlur: () => undefined,
    readOnly: false,
    disabled: false,
    required: true,
    fieldProps: {},
    // tooltip: {
    //   content: "This is a tooltip",
    //   Icon: <button>Info</button>,
    //   defaultIconProps: { color: "blue" },
    // },
  };

  it("TextInputEditField can have text entered into it", async () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();
    render(
      <div>
        <div>Trigger Blur</div>
        <TextInputEditViewWrapper
          {...textInputFieldProps}
          onChange={mockOnChange}
          onBlur={mockOnBlur}
        />
      </div>
    );
    const textInput: HTMLInputElement = screen.getByRole("textbox");

    await userEvent.type(textInput, "input value");
    expect(textInput.value).toBe("input value");
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith("input value");

    await userEvent.click(screen.getByText("Trigger Blur"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("TextInputEditField should be invalid on error", async () => {
    const mockOnValid = vi.fn();
    const mockOnInvalid = vi.fn();
    render(
      <TextInputEditViewWrapper
        {...textInputFieldProps}
        onValidFn={mockOnValid}
        onInvalidFn={mockOnInvalid}
      />
    );
    const submitButton = screen.getByText("Submit");

    await userEvent.click(submitButton);
    expect(screen.getByPlaceholderText("Enter text...")).toBeInvalid();
    expect(mockOnValid).not.toHaveBeenCalled();
    expect(mockOnInvalid).toHaveBeenCalled();
    expect(mockOnInvalid.mock.calls[0][0].userText.message).toBe(
      "need to input text"
    );
    expect(mockOnInvalid.mock.calls[0][0].userText.type).toBe("invalid_type");
  });

  it("TextInputEditField should submit correctly", async () => {
    const mockOnValid = vi.fn();
    const mockOnInvalid = vi.fn();
    render(
      <TextInputEditViewWrapper
        {...textInputFieldProps}
        onValidFn={mockOnValid}
        onInvalidFn={mockOnInvalid}
      />
    );
    const textInput: HTMLInputElement = screen.getByRole("textbox");
    await userEvent.type(textInput, "input value");

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    expect(mockOnValid).toHaveBeenCalled();
    expect(mockOnValid.mock.calls[0][0]).to.deep.equal({
      userText: "input value",
    });
  });
});
