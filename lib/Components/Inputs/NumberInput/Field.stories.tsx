import type { Meta, StoryObj } from "@storybook/react";
import NumberInputField from "./Field";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const meta: Meta<typeof NumberInputField> = {
  component: NumberInputField,
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
        "Alternative component to render in the edit view. Should expect NumberInputEditViewProps and be a forwarded ref component.",
      control: false,
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    formatOptions: {
      description:
        "Options to format the number's display value to the user. Ex: currency or percent.",
      control: {
        type: "object",
      },
      table: {
        defaultValue: {
          summary: "undefined",
          detail: `For example: {
            "style": "currency",
            "currency": "USD",
            "minimumFractionDigits": 2
          }`,
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
    maxValue: {
      description: "Maximum allowed number value in the input.",
      type: "number",
      control: {
        type: "number",
      },
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
    minValue: {
      description: "Minimum allowed number value in the input.",
      type: "number",
      control: {
        type: "number",
      },
      table: {
        defaultValue: {
          summary: "undefined",
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
    placeholder: {
      description: "Placeholder text to show when the input is empty.",
      control: {
        type: "text",
      },
      table: {
        defaultValue: {
          summary: "",
        },
      },
    },
    ReadView: {
      description:
        "Alternative component to render in the read view. Should expect NumberInputReadViewProps and be a forwarded ref component.",
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
    tooltipProps: {
      description:
        "A set of options to render a tooltip within the field label",
      table: {
        defaultValue: {
          summary: "undefined",
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof NumberInputField>;

export const Basic: Story = {
  args: {
    label: "Basic Number Input Field",
    helperText: "Number input helper text.",
    name: "numberInput",
    tooltipProps: {
      content: "I am a tooltip",
    },
  },
};

export const Error: Story = {
  args: {
    label: "Error Number Input Field",
    helperText: "Number input helper text.",
    name: "numberInput",
    tooltipProps: {
      content: "I am a tooltip",
    },
  },
  argTypes: {
    name: {
      control: false,
    },
  },
  render: (props) => {
    const formMethods = useForm();
    const errors = {
      numberInput: {
        message: "Number input error",
        type: "value",
      },
    };
    return (
      <NumberInputField
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
    label: "Disabled Number Input Field",
    helperText: "Number input helper text.",
    name: "numberInput",
    disabled: true,
    tooltipProps: {
      content: "I am a tooltip",
    },
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
    label: "Read Only Number Input Field",
    helperText: "Number input helper text.",
    name: "numberInput",
    readOnly: true,
    tooltipProps: {
      content: "I am a tooltip",
    },
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
