import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MaskedTextInputReadView, {
  MaskedTextInputReadViewProps,
} from "./ReadView";

const MaskedTextInputReadViewWrapper = (
  props: MaskedTextInputReadViewProps
) => {
  return <MaskedTextInputReadView {...props} />;
};

describe("Inputs/MaskedTextInput/ReadView", () => {
  const maskedTextInputFieldProps: MaskedTextInputReadViewProps = {
    inputValue: "text",
    maskOptions: {
      mask: "___ ___ ___",
      replacement: {
        _: /\d/,
      },
      showMask: true,
    },
    fieldProps: {},
  };

  it("MaskedTextInputReadField should render the inputValue formatted", async () => {
    render(<MaskedTextInputReadViewWrapper {...maskedTextInputFieldProps} />);
    expect(screen.getByText("tex t__ ___")).toBeInTheDocument();
  });

  it("MaskedTextInputReadField should render None for empty input value without noValueMessage", async () => {
    render(
      <MaskedTextInputReadViewWrapper
        {...maskedTextInputFieldProps}
        inputValue={""}
      />
    );
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("MaskedTextInputReadField should render no value message for empty inputValue", async () => {
    render(
      <MaskedTextInputReadViewWrapper
        {...maskedTextInputFieldProps}
        inputValue={undefined as any}
        noValueMessage="Nothing here"
      />
    );
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });
});
