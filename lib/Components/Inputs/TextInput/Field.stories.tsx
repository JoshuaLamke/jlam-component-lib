import type { Meta, StoryObj } from "@storybook/react";
import TextInputField from "./Field";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const meta: Meta<typeof TextInputField> = {
  component: TextInputField,
  decorators: [
    (Story) => {
      const formMethods = useForm();
      return (
        <FormProvider {...formMethods}>
          <Story />
        </FormProvider>
      );
    },
  ],
  argTypes: {
    name: {
      description:
        "Name of the form input. This is tied to the path it will save in react-hook-form.",
    },
    label: {
      description: "Label for the input. This will appear above the input.",
      defaultValue: {
        summary: "",
      },
    },
    helperText: {
      description:
        "Text for any additional info about the field. This appears below the input.",
      defaultValue: {
        summary: "",
      },
    },
    placeholder: {
      description: "Placeholder text to show when the input is empty.",
      defaultValue: {
        summary: "",
      },
    },
    required: {
      description:
        "Whether the input is a required field or not. This will display a red asterisk after the label.",
      defaultValue: {
        summary: "false",
      },
    },
    disabled: {
      description:
        "Whether the input is disabled or not. The input value will not be focusable.",
      defaultValue: {
        summary: "false",
      },
    },
    readOnly: {
      description:
        "Whether the input is read only or not. The input value will be focusable.",
      defaultValue: {
        summary: "false",
      },
    },
    state: {
      description: "The appearance state the input is in.",
      defaultValue: {
        summary: "edit",
      },
    },
    noValueMessage: {
      description:
        "Text that will appear instead of default empty message when input is empty and in read state.",
      defaultValue: {
        summary: "",
      },
    },
    size: {
      description:
        "The size of the input field and its label, helper text, etc.",
      defaultValue: {
        summary: "md",
      },
    },
    EditView: {
      description:
        "Alternative component to render in the edit view. Should expect TextInputEditViewProps and be a forwarded ref component.",
      control: false,
      defaultValue: {
        summary: "undefined",
      },
    },
    ReadView: {
      description:
        "Alternative component to render in the read view. Should expect TextInputReadViewProps and be a forwarded ref component.",
      control: false,
      defaultValue: {
        summary: "undefined",
      },
    },
    formMethods: {
      description:
        "Form methods from the useForm hook in react-hook-form. If not using FormProvider to pass the form methods then you must pass in the form methods directly with this prop.",
      control: false,
      defaultValue: {
        summary: "undefined",
      },
    },
    onBlur: {
      description: "Function to run on input blur.",
      type: "function",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    onChange: {
      description: "Function to run on input value change.",
      type: "function",
      defaultValue: {
        summary: "undefined",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextInputField>;

export const Basic: Story = {
  args: {
    label: "Basic Text Input Field",
    helperText: "Text input helper text.",
    name: "textInput",
  },
};

export const Error: Story = {
  args: {
    label: "Error Text Input Field",
    helperText: "Text input helper text.",
    name: "textInput",
  },
  argTypes: {
    name: {
      control: false,
    },
  },
  render: (props) => {
    const formMethods = useForm();
    const errors = {
      textInput: {
        message: "Text input error",
        type: "value",
      },
    };
    return (
      <TextInputField
        {...props}
        formMethods={{
          ...formMethods,
          formState: { ...formMethods.formState, errors },
        }}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Text Input Field",
    helperText: "Text input helper text.",
    name: "textInput",
    disabled: true,
  },
  argTypes: {
    disabled: {
      control: false,
    },
    readOnly: {
      control: false,
    },
  },
};

export const ReadOnly: Story = {
  args: {
    label: "Read Only Text Input Field",
    helperText: "Text input helper text.",
    name: "textInput",
    readOnly: true,
  },
  argTypes: {
    disabled: {
      control: false,
    },
    readOnly: {
      control: false,
    },
  },
};
