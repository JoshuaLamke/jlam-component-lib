import { render, screen } from "@testing-library/react";
import Field from "./Field";
import { Ref } from "react";
describe("Inputs/Field/Field", () => {
  it("Field will render correctly for basic props", async () => {
    render(
      <Field
        label="Text Input"
        description="Helper text"
        required
        tooltipProps={{ content: "I am a tooltip" }}
      >
        {(ref, fieldProps) => {
          return (
            <input
              ref={ref as Ref<HTMLInputElement>}
              type="text"
              placeholder="Enter text..."
              {...fieldProps}
            />
          );
        }}
      </Field>
    );
    expect(screen.getByLabelText("Text Input*")).toBeInTheDocument(); // * is for required
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
    expect(screen.getByText("Helper text")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Field will show error text when invalid is true", async () => {
    render(
      <Field
        label="Text Input"
        description="Helper text"
        required
        isInvalid
        errorMessage="Field error message"
      >
        {(ref, fieldProps) => {
          return (
            <input
              ref={ref as Ref<HTMLInputElement>}
              type="text"
              placeholder="Enter text..."
              {...fieldProps}
            />
          );
        }}
      </Field>
    );
    expect(screen.getByText("Field error message")).toBeInTheDocument();
  });
});
