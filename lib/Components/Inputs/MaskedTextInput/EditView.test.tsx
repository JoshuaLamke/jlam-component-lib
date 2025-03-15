import { fireEvent, render, screen } from "@testing-library/react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { omit } from "../../../";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import MaskedTextInputEditView, {
  MaskedTextInputEditViewProps,
} from "./EditView";
import { useRef } from "react";

const MaskedTextInputEditViewWrapper = (
  props: Omit<
    MaskedTextInputEditViewProps<{ maskedUserText: string }>,
    "formMethods"
  > & {
    onValidFn?: (data: any) => undefined;
    onInvalidFn?: (errors: FieldErrors<any>) => undefined;
    defaultValue?: any;
  }
) => {
  const formSchema = z.object({
    maskedUserText: z.string().min(1, { message: "need to input text" }),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maskedUserText: "",
    },
  });

  const ref = useRef<HTMLElement | null>(null);
  return (
    <form
      noValidate
      onSubmit={methods.handleSubmit(props.onValidFn!, props.onInvalidFn)}
    >
      <MaskedTextInputEditView
        {...omit(props, ["onInvalidFn", "onValidFn", "defaultValue"])}
        formMethods={methods}
        ref={ref}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe("Inputs/MaskedTextInput/EditView", () => {
  const maskedTextInputProps: Omit<
    MaskedTextInputEditViewProps<{ maskedUserText: string }>,
    "formMethods"
  > = {
    name: "maskedUserText",
    size: "md",
    onChange: () => undefined,
    onBlur: () => undefined,
    readOnly: false,
    disabled: false,
    required: true,
    maskOptions: {
      mask: "___ __ ____",
      replacement: {
        _: /\d/,
      },
    },
    fieldProps: {},
  };

  it("MaskedTextInputEditField can have text entered into it", async () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();
    render(
      <div>
        <div>Trigger Blur</div>
        <MaskedTextInputEditViewWrapper
          {...maskedTextInputProps}
          onChange={mockOnChange}
          onBlur={mockOnBlur}
        />
      </div>
    );
    const textInput: HTMLInputElement = screen.getByRole("textbox");
    fireEvent.focus(textInput);
    fireEvent.keyDown(textInput, {
      key: "ArrowLeft",
      code: "ArrowLeft",
      charCode: 37,
    });
    await userEvent.type(textInput, "11111");
    await userEvent.type(textInput, "{backspace}");

    expect(mockOnChange).toHaveBeenCalled();

    await userEvent.click(screen.getByText("Trigger Blur"));
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("MaskedTextInputEditField should show error", async () => {
    const mockOnValid = vi.fn();
    const mockOnInvalid = vi.fn();
    render(
      <MaskedTextInputEditViewWrapper
        {...maskedTextInputProps}
        onValidFn={mockOnValid}
        onInvalidFn={mockOnInvalid}
      />
    );
    const submitButton = screen.getByText("Submit");

    await userEvent.click(submitButton);
    expect(screen.getByRole("textbox")).toBeInvalid();
    expect(mockOnValid).not.toHaveBeenCalled();
    expect(mockOnInvalid).toHaveBeenCalled();
    expect(mockOnInvalid.mock.calls[0][0].maskedUserText.message).toBe(
      "need to input text"
    );
    expect(mockOnInvalid.mock.calls[0][0].maskedUserText.type).toBe(
      "too_small"
    );
  });

  it("MaskedTextInputEditField should submit correctly", async () => {
    const mockOnValid = vi.fn();
    const mockOnInvalid = vi.fn();
    render(
      <MaskedTextInputEditViewWrapper
        {...maskedTextInputProps}
        onValidFn={mockOnValid}
        onInvalidFn={mockOnInvalid}
      />
    );
    const textInput: HTMLInputElement = screen.getByRole("textbox");
    await userEvent.type(textInput, "111222333");

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    expect(mockOnValid).toHaveBeenCalled();
    expect(mockOnValid.mock.calls[0][0]).to.deep.equal({
      maskedUserText: "111222333",
    });
  });
});
