import type { Meta, StoryObj } from "@storybook/react";
import RadioInputField from "./Field";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const meta: Meta<typeof RadioInputField> = {
  component: RadioInputField,
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
    disabled: {
      description:
        "Whether the input is disabled or not. The input value will not be focusable.",
      control: {
        type: "boolean",
      },
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    EditView: {
      description:
        "Alternative component to render in the edit view. Should expect RadioInputEditViewProps and be a forwarded ref component.",
      control: false,
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    formMethods: {
      description:
        "Form methods from the useForm hook in react-hook-form. If not using FormProvider to pass the form methods then you must pass in the form methods directly with this prop.",
      control: false,
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    helperText: {
      description:
        "Text for any additional info about the field. This appears below the input.",
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "",
        },
      },
    },
    label: {
      description: "Label for the input. This will appear above the input.",
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "",
        },
      },
    },
    name: {
      description:
        "Name of the form input. This is tied to the path it will save in react-hook-form.",
      control: {
        type: "text",
      },
    },
    noValueMessage: {
      description:
        "Text that will appear instead of default empty message when input is empty and in read state.",
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "",
        },
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
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    optionLabelName: {
      description:
        "Keyname to access the label for each radio input in options object",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    optionValueName: {
      description:
        "Keyname to access the value for each raio input in options object",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    options: {
      description: "Radio button list options",
      table: {
        type: {
          summary: "Array<SelectOption<OptionValueName, OptionLabelName>>",
          detail:
            "Array of objects with two keys. One for the radio label (OptionLabelName), and one for the radio value (OptionValueName)",
        },
      },
    },
    ReadView: {
      description:
        "Alternative component to render in the read view. Should expect RadioInputReadViewProps and be a forwarded ref component.",
      control: false,
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    readOnly: {
      description:
        "Whether the input is read only or not. The input value will be focusable.",
      control: {
        type: "boolean",
      },
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    required: {
      description:
        "Whether the input is a required field or not. This will display a red asterisk after the label.",
      control: {
        type: "boolean",
      },
      table: {
        defaultValue: {
          summary: "false",
        },
      },
    },
    size: {
      description:
        "The size of the input field and its label, helper text, etc.",
      control: {
        type: "radio",
        labels: {
          sm: "sm",
          md: "md",
          lg: "lg",
          xl: "xl",
        },
      },
      table: {
        defaultValue: {
          summary: "md",
        },
      },
    },
    state: {
      description: "The appearance state the input is in.",
      control: {
        type: "radio",
        labels: {
          edit: "edit",
          read: "read",
        },
      },
      table: {
        defaultValue: {
          summary: "edit",
        },
      },
    },
    valueMapping: {
      description:
        "How you want to store the form data (object, string, boolean)",
      table: {
        type: {
          summary: "'objectValue' | 'stringValue' | 'booleanValue'",
        },
        defaultValue: {
          summary: "objectValue",
          detail:
            "Will save the entire option object whose value is chosen from the radio.",
        },
      },
    },
    valueMappingOverride: {
      description:
        "Object with functions to allow you to store/display the data how you want to if the defaults are insufficient",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioInputField>;

export const Basic: Story = {
  args: {
    label: "Basic Radio Input Field",
    helperText: "Radio input helper text.",
    name: "radioInput",
    optionLabelName: "label",
    optionValueName: "value",
    options: [
      {
        label: "Option 1",
        value: "opt1",
      },
      {
        label: "Option 2",
        value: "opt2",
      },
      {
        label: "Option 3",
        value: "opt3",
      },
      {
        label: "Option 4",
        value: "opt4",
      },
    ],
  },
};

export const Error: Story = {
  args: {
    label: "Error Radio Input Field",
    helperText: "Radio input helper text.",
    name: "radioInput",
    optionLabelName: "label",
    optionValueName: "value",
    options: [
      {
        label: "Option 1",
        value: "opt1",
      },
      {
        label: "Option 2",
        value: "opt2",
      },
      {
        label: "Option 3",
        value: "opt3",
      },
      {
        label: "Option 4",
        value: "opt4",
      },
    ],
  },
  argTypes: {
    name: {
      control: false,
    },
  },
  render: (props) => {
    const formMethods = useForm();
    const errors = {
      radioInput: {
        message: "Radio input error",
        type: "value",
      },
    };
    return (
      <RadioInputField
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
    label: "Disabled Radio Input Field",
    helperText: "Radio input helper text.",
    name: "radioInput",
    disabled: true,
    optionLabelName: "label",
    optionValueName: "value",
    options: [
      {
        label: "Option 1",
        value: "opt1",
      },
      {
        label: "Option 2",
        value: "opt2",
      },
      {
        label: "Option 3",
        value: "opt3",
      },
      {
        label: "Option 4",
        value: "opt4",
      },
    ],
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
    label: "Read Only Radio Input Field",
    helperText: "Radio input helper text.",
    name: "radioInput",
    readOnly: true,
    optionLabelName: "label",
    optionValueName: "value",
    options: [
      {
        label: "Option 1",
        value: "opt1",
      },
      {
        label: "Option 2",
        value: "opt2",
      },
      {
        label: "Option 3",
        value: "opt3",
      },
      {
        label: "Option 4",
        value: "opt4",
      },
    ],
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
