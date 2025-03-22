import { render, screen } from "@testing-library/react";
import RadioInputReadView, { RadioInputReadViewProps } from "./ReadView";

const RadioInputReadViewWrapper = (
  props: RadioInputReadViewProps<"value", "label">
) => {
  return <RadioInputReadView<"value", "label"> {...props} />;
};

describe("Inputs/RadioInput/ReadView", () => {
  const radioInputFieldProps: RadioInputReadViewProps<"value", "label"> = {
    optionValueName: "value",
    optionLabelName: "label",
    storedValue: {
      label: "Option1",
      value: "opt1",
    },
    fieldProps: {},
    options: [
      {
        label: "Option1",
        value: "opt1",
      },
      {
        label: "Option2",
        value: "opt2",
      },
    ],
  };

  it("RadioInputField should render the storedValue", async () => {
    render(<RadioInputReadViewWrapper {...radioInputFieldProps} />);
    expect(screen.getByText("Option1")).toBeInTheDocument();
  });

  it("RadioInputField should render none selected when empty", async () => {
    const { rerender } = render(
      <RadioInputReadViewWrapper {...radioInputFieldProps} storedValue={null} />
    );
    expect(screen.getByText("None Selected")).toBeInTheDocument();

    rerender(
      <RadioInputReadViewWrapper
        {...radioInputFieldProps}
        storedValue={undefined}
      />
    );
    expect(screen.getByText("None Selected")).toBeInTheDocument();
  });

  it("RadioInputField should render no value message when empty", async () => {
    const { rerender } = render(
      <RadioInputReadViewWrapper
        {...radioInputFieldProps}
        storedValue={null}
        noValueMessage="Nothing here"
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();

    rerender(
      <RadioInputReadViewWrapper
        {...radioInputFieldProps}
        storedValue={undefined}
        noValueMessage="Nothing here"
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("RadioInputField should render no value message when empty on string valueMapping", async () => {
    const { rerender } = render(
      <RadioInputReadViewWrapper
        {...radioInputFieldProps}
        storedValue={null}
        valueMapping="stringValue"
        noValueMessage="Nothing here"
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();

    rerender(
      <RadioInputReadViewWrapper
        {...radioInputFieldProps}
        storedValue={undefined}
        noValueMessage="Nothing here"
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("RadioInputField should render boolean valueMapping correctly", async () => {
    const { rerender } = render(
      <RadioInputReadViewWrapper
        {...radioInputFieldProps}
        storedValue={true}
        valueMapping="booleanValue"
        noValueMessage="Nothing here"
        options={[
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ]}
      />
    );
    expect(screen.getByText("Yes")).toBeInTheDocument();

    rerender(
      <RadioInputReadViewWrapper
        {...radioInputFieldProps}
        storedValue={false}
        valueMapping="booleanValue"
        noValueMessage="Nothing here"
        options={[
          { label: "Yes", value: "true" },
          { label: "No", value: "false" },
        ]}
      />
    );
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  it("RadioInputField should render string valueMapping correctly", async () => {
    render(
      <RadioInputReadViewWrapper
        {...radioInputFieldProps}
        storedValue={"yes"}
        valueMapping="stringValue"
        noValueMessage="Nothing here"
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />
    );
    expect(screen.getByText("Yes")).toBeInTheDocument();
  });

  it("RadioInputField should render no value message when empty", async () => {
    render(
      <RadioInputReadViewWrapper
        {...radioInputFieldProps}
        valueMappingOverride={() => {
          return {
            formatFromStoredValToDisplayVal(storedVal) {
              return (storedVal as string)?.toLowerCase();
            },
            formatFromStoredValToRadioVal(storedVal) {
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
        storedValue={"STORED VALUE"}
        noValueMessage="Nothing here"
      />
    );
    expect(screen.getByText("stored value")).toBeInTheDocument();
  });
});
