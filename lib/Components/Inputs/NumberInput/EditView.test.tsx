import { render, screen } from "@testing-library/react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { omit } from "../../../";
import userEvent from "@testing-library/user-event";
import NumberInputEditView, { NumberInputEditViewProps } from "./EditView";
import { useRef } from "react";

const NumberInputEditViewWrapper = (
  props: Omit<
    NumberInputEditViewProps<{ userNumber?: number }>,
    "formMethods"
  > & {
    onValidFn?: (data: any) => undefined;
    onInvalidFn?: (errors: FieldErrors<any>) => undefined;
    defaultValue?: any;
  }
) => {
  const formSchema = z.object({
    userNumber: z.number({ message: "need to input number" }),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userNumber: undefined,
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      noValidate
      onSubmit={methods.handleSubmit(props.onValidFn!, props.onInvalidFn)}
    >
      <NumberInputEditView
        {...omit(props, ["onInvalidFn", "onValidFn", "defaultValue"])}
        formMethods={methods}
        ref={ref}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

describe("Inputs/NumberInput/EditView", () => {
  const numberInputFieldProps: Omit<
    NumberInputEditViewProps<{ userNumber?: number }>,
    "formMethods"
  > = {
    name: "userNumber",
    placeholder: "Enter number...",
    size: "md",
    onChange: (_val) => undefined,
    onBlur: () => undefined,
    readOnly: false,
    disabled: false,
    required: true,
    fieldProps: {},
  };

  it("NumberInputEditField can have a number entered and removed from it", async () => {
    const mockOnChange = vi.fn();
    const mockOnBlur = vi.fn();
    render(
      <div>
        <div>Trigger Blur</div>
        <NumberInputEditViewWrapper
          {...numberInputFieldProps}
          onChange={mockOnChange}
          onBlur={mockOnBlur}
        />
      </div>
    );
    const numberInput: HTMLInputElement =
      screen.getByPlaceholderText("Enter number...");

    await userEvent.type(numberInput, "100");
    expect(numberInput.value).toBe("100");
    await userEvent.click(screen.getByText("Trigger Blur")); // onChange runs after blur to avoid formatting issues

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith(100);

    await userEvent.clear(numberInput);
    await userEvent.click(screen.getByText("Trigger Blur"));
    expect(mockOnChange).toHaveBeenCalledWith(NaN);

    expect(mockOnBlur).toHaveBeenCalled();
  });

  it("NumberInputEditField should show error", async () => {
    const mockOnValid = vi.fn();
    const mockOnInvalid = vi.fn();
    render(
      <div>
        <NumberInputEditViewWrapper
          {...numberInputFieldProps}
          onValidFn={mockOnValid}
          onInvalidFn={mockOnInvalid}
        />
      </div>
    );
    const submitButton = screen.getByText("Submit");

    await userEvent.click(submitButton);
    expect(screen.getByPlaceholderText("Enter number...")).toBeInvalid();
    expect(mockOnValid).not.toHaveBeenCalled();
    expect(mockOnInvalid).toHaveBeenCalled();
    expect(mockOnInvalid.mock.calls[0][0].userNumber.message).toBe(
      "need to input number"
    );
    expect(mockOnInvalid.mock.calls[0][0].userNumber.type).toBe("invalid_type");
  });

  it("NumberInputEditField should submit correctly", async () => {
    const mockOnValid = vi.fn();
    const mockOnInvalid = vi.fn();
    render(
      <div>
        <NumberInputEditViewWrapper
          {...numberInputFieldProps}
          onValidFn={mockOnValid}
          onInvalidFn={mockOnInvalid}
        />
      </div>
    );
    const numberInput: HTMLInputElement =
      screen.getByPlaceholderText("Enter number...");
    await userEvent.type(numberInput, "100");

    const submitButton = screen.getByText("Submit");
    await userEvent.click(submitButton);

    expect(mockOnValid).toHaveBeenCalled();
    expect(mockOnValid.mock.calls[0][0]).to.deep.equal({
      userNumber: 100,
    });
  });
});
