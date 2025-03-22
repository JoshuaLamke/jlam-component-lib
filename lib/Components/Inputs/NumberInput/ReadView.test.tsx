import { render, screen } from "@testing-library/react";
import NumberInputReadView, { NumberInputReadViewProps } from "./ReadView";

const NumberInputReadViewWrapper = (props: NumberInputReadViewProps) => {
  return <NumberInputReadView {...props} />;
};

describe("Inputs/NumberInput/ReadView", () => {
  const textInputFieldProps: NumberInputReadViewProps = {
    inputValue: 100,
    fieldProps: {},
  };

  it("NumberInputField should render the inputValue", async () => {
    render(<NumberInputReadViewWrapper {...textInputFieldProps} />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("NumberInputField should render 0 correctly even though its a falsey value", async () => {
    render(
      <NumberInputReadViewWrapper {...textInputFieldProps} inputValue={0} />
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("NumberInputField should render NaN correctly by being like theres no value", async () => {
    render(
      <NumberInputReadViewWrapper {...textInputFieldProps} inputValue={NaN} />
    );
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("NumberInputField should render None for empty input value without noValueMessage", async () => {
    render(
      <NumberInputReadViewWrapper
        {...textInputFieldProps}
        inputValue={undefined}
      />
    );
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("NumberInputField should render no value message for empty inputValue", async () => {
    render(
      <NumberInputReadViewWrapper
        {...textInputFieldProps}
        inputValue={undefined}
        noValueMessage="Nothing here"
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});
