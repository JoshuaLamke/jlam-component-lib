import { render, screen } from "@testing-library/react";
import YesNoInputField, { YesNoInputFieldProps } from "./Field";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FieldWrapper = (
  props: YesNoInputFieldProps<{ yesno: boolean | null }>
) => {
  const formSchema = z.object({
    yesno: z.boolean(),
  });
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yesno: undefined,
    },
  });
  return (
    <FormProvider {...methods}>
      <YesNoInputField {...props} />
    </FormProvider>
  );
};

describe("Inputs/RadioInput/YesNoInput/Field", () => {
  const yesNoInputFieldProps: YesNoInputFieldProps<{ yesno: boolean | null }> =
    {
      label: "Yes No",
      name: "yesno",
      size: "md",
      onChange: (val) => console.log(val),
      onBlur: () => console.log("Field blurred"),
      state: "edit",
      readOnly: false,
      disabled: false,
      required: true,
      helperText: "Yes or No",
      tooltipProps: {
        content: "This is a tooltip",
        Icon: <button>Info</button>,
      },
    };

  it("YesNoInputField should render correctly in edit state", async () => {
    render(<FieldWrapper {...yesNoInputFieldProps} />);
    expect(screen.getByText("Yes No")).toBeInTheDocument();
  });

  it("YesNoInputField should render in read state", async () => {
    render(<FieldWrapper {...yesNoInputFieldProps} state="read" />);
    expect(screen.getByText("None Selected")).toBeInTheDocument();
  });

  it("YesNoInputField should render with alternative labels for yes and no", async () => {
    render(
      <FieldWrapper
        {...yesNoInputFieldProps}
        yesLabelName="Sure"
        noLabelName="Nah"
      />
    );
    expect(screen.getByText("Sure")).toBeInTheDocument();
    expect(screen.getByText("Nah")).toBeInTheDocument();
  });
});
