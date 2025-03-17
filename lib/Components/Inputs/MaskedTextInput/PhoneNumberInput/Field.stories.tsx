import type { Meta, StoryObj } from "@storybook/react";
import PhoneNumberInputField from "./Field";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const meta: Meta<typeof PhoneNumberInputField> = {
  component: PhoneNumberInputField,
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
    countryCode: {
      description:
        "The country code value when using the International phone number format.",
      table: {
        defaultValue: {
          summary: "",
        },
      },
    },
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
        "Alternative component to render in the edit view. Should expect PhoneNumberInputEditViewProps and be a forwarded ref component.",
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
    ReadView: {
      description:
        "Alternative component to render in the read view. Should expect PhoneNumberInputReadViewProps and be a forwarded ref component.",
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
        options: ["sm", "md", "lg", "xl"],
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
        options: ["edit", "read"],
      },
      table: {
        defaultValue: {
          summary: "edit",
        },
      },
    },
    maskOptions: {
      description:
        "Options for the input mask. The mask and replacement are already fixed.",
      control: {
        type: "object",
      },
      table: {
        defaultValue: {
          summary: `default mask object`,
          detail: `{mask: "___-___-____", replacement: { _: /\d/ }}`,
        },
        type: {
          summary: 'Omit<InputMaskOptions, "mask" | "replacement">',
        },
      },
    },
    phoneNumberFormat: {
      description: "Mask format for the phone number.",
      control: {
        type: "radio",
        options: [
          "Standard (With Parentheses)",
          "International (With Country Code)",
          "Dashed (No Parentheses)",
        ],
      },
      table: {
        defaultValue: {
          summary: "Dashed (No Parentheses)",
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof PhoneNumberInputField>;

export const Basic: Story = {
  args: {
    label: "Basic Phone Number Input Field",
    helperText: "Phone Number input helper text.",
    name: "phoneNumberInput",
    maskOptions: {
      showMask: true,
    },
  },
};

export const Error: Story = {
  args: {
    label: "Error Phone Number Input Field",
    helperText: "Phone Number input helper text.",
    name: "phoneNumberInput",
    maskOptions: {
      showMask: true,
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
      phoneNumberInput: {
        message: "Phone Number input error",
        type: "value",
      },
    };
    return (
      <PhoneNumberInputField
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
    label: "Disabled Phone Number Input Field",
    helperText: "Phone Number input helper text.",
    name: "phoneNumberInput",
    disabled: true,
    maskOptions: {
      showMask: true,
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
    label: "Read Only Phone Number Input Field",
    helperText: "Phone Number input helper text.",
    name: "phoneNumberInput",
    readOnly: true,
    maskOptions: {
      showMask: true,
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
