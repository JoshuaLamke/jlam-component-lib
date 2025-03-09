import { render, screen } from "@testing-library/react";
import TextInputReadView, { TextInputReadViewProps } from "./ReadView";

const TextInputReadViewWrapper = (props: TextInputReadViewProps) => {
  return <TextInputReadView {...props} />;
};

describe("Inputs/TextInput/ReadView", () => {
  const textInputFieldProps: TextInputReadViewProps = {
    inputValue: "text",
    fieldProps: {},
  };

  it("TextInputField should render the inputValue", async () => {
    render(<TextInputReadViewWrapper {...textInputFieldProps} />);
    expect(screen.getByText("text")).toBeInTheDocument();
  });

  it("TextInputField should render None for empty input value without noValueMessage", async () => {
    render(
      <TextInputReadViewWrapper {...textInputFieldProps} inputValue={""} />
    );
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("TextInputField should render no value message for empty inputValue", async () => {
    render(
      <TextInputReadViewWrapper
        {...textInputFieldProps}
        inputValue={undefined as any}
        noValueMessage="Nothing here"
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});
