import { Controller, FieldValues, UseFormReturn } from "react-hook-form";
import { getDefaultValueMappings, RadioInputFieldProps } from "./Field";
import {
  createContext,
  forwardRef,
  Ref,
  useContext,
  useRef,
  useState,
} from "react";
import {
  FieldAria,
  useFocusRing,
  useRadio,
  useRadioGroup,
  VisuallyHidden,
} from "react-aria";
import { RadioGroupState, useRadioGroupState } from "react-stately";

export interface RadioInputEditViewProps<
  TData extends FieldValues,
  OptionValueName extends string,
  OptionLabelName extends string
> extends Omit<
    RadioInputFieldProps<TData, OptionValueName, OptionLabelName>,
    | "EditView"
    | "ReadView"
    | "state"
    | "helperText"
    | "noValueMessage"
    | "label"
    | "tooltipProps"
  > {
  formMethods: UseFormReturn<TData>;
  fieldProps: FieldAria["fieldProps"];
}

const RadioGroupContext = createContext<RadioGroupState | null>(null);

interface RadioInputGroupProps<TData extends FieldValues> {
  name: string;
  formMethods: UseFormReturn<TData>;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value: string | null;
  fieldProps: FieldAria["fieldProps"];
  children: React.ReactNode;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const RadioInputGroupInner = <TData extends FieldValues = FieldValues>(
  {
    name,
    formMethods,
    required,
    disabled,
    readOnly,
    value,
    children,
    fieldProps,
    onChange,
    onBlur,
  }: RadioInputGroupProps<TData>,
  ref: Ref<HTMLElement>
) => {
  const {
    formState: { errors },
  } = formMethods;

  const isInvalid = !!errors[name];

  const state = useRadioGroupState({
    isRequired: required,
    isDisabled: disabled,
    isReadOnly: readOnly,
    isInvalid,
    value,
    name,
    onChange,
    onBlur,
    ...fieldProps,
  });

  const { radioGroupProps } = useRadioGroup(
    {
      isRequired: required,
      isDisabled: disabled,
      isReadOnly: readOnly,
      isInvalid,
      value,
      name,
      onChange,
      onBlur,
      ...fieldProps,
    },
    state
  );

  return (
    <div
      {...radioGroupProps}
      ref={ref as Ref<HTMLDivElement>}
      className={`
      flex flex-wrap rounded-md py-1 px-2 outline 
      focus:ring-[1.5px]
      ${disabled && "hover:outline-none outline-none"}
      ${(disabled || readOnly) && "bg-gray-200"}
      ${
        isInvalid
          ? "outline-red-400 focus:ring-red-600 focus:outline-red-600 hover:outline-red-500"
          : "outline-gray-300 focus:ring-black focus:outline-black hover:outline-gray-700"
      }
    `}
    >
      <RadioGroupContext.Provider value={state}>
        {children}
      </RadioGroupContext.Provider>
    </div>
  );
};

const RadioInputGroup = forwardRef(RadioInputGroupInner) as <
  TData extends FieldValues = FieldValues
>(
  props: RadioInputGroupProps<TData> & {
    ref?: Ref<HTMLElement | null>;
  }
) => ReturnType<typeof RadioInputGroupInner>;

interface RadioInputProps<
  OptionValueName extends string,
  OptionLabelName extends string
> {
  optionValue: string;
  optionLabel: string;
  disabled?: boolean;
  readOnly?: boolean;
  onBlur?: () => void;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg" | "xl";
}

const RadioInput = <
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
>({
  disabled,
  readOnly,
  onBlur,
  onChange,
  size,
  optionLabel,
  optionValue,
}: RadioInputProps<OptionValueName, OptionLabelName>) => {
  const state = useContext(RadioGroupContext);

  const radioRef = useRef<HTMLInputElement>(null);

  const { inputProps, isSelected, isDisabled } = useRadio(
    {
      value: optionValue,
      isDisabled: disabled,
      "aria-label": optionLabel,
      onBlur: onBlur,
    },
    state!,
    radioRef
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const strokeWidth = isSelected ? 5 : 1;

  const canUpdateValue = !(disabled || readOnly);
  const opacity = disabled ? "opacity-40" : "opacity-100";

  return (
    <label className={`me-2 flex items-center cursor-pointer ${opacity}`}>
      <VisuallyHidden>
        <input
          {...inputProps}
          {...focusProps}
          ref={radioRef}
          type="radio"
          onClick={() => canUpdateValue && onChange(optionValue)}
          onKeyDown={(e) => {
            if (e.key === " " && canUpdateValue) {
              e.preventDefault();
              onChange(optionValue);
            }
          }}
        />
      </VisuallyHidden>
      <svg width={24} height={24} aria-hidden="true" style={{ marginRight: 4 }}>
        <circle
          cx={12}
          cy={12}
          r={8 - strokeWidth / 2}
          fill="none"
          stroke={"black"}
          strokeWidth={strokeWidth}
        />
        {isFocusVisible && (
          <circle
            cx={12}
            cy={12}
            r={11}
            fill="none"
            stroke="black"
            strokeWidth={1}
          />
        )}
      </svg>
      <span>{optionLabel}</span>
    </label>
  );
};

const RadioInputEditViewInner = <
  TData extends FieldValues = FieldValues,
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
>(
  {
    name,
    formMethods,
    required,
    optionValueName,
    optionLabelName,
    size,
    options,
    onBlur,
    onChange,
    valueMapping = "objectValue",
    valueMappingOverride,
    disabled,
    readOnly,
    fieldProps,
  }: RadioInputEditViewProps<TData, OptionValueName, OptionLabelName>,
  ref: Ref<HTMLElement> | null
) => {
  const { control } = formMethods;

  const defaultValueMappings = getDefaultValueMappings(options);

  const valueMappingFns =
    valueMappingOverride?.(options) ?? defaultValueMappings[valueMapping];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const [radioGroupValue, setRadioGroupValue] = useState<string | null>(
          valueMappingFns.formatFromStoredValToRadioVal(
            field.value,
            optionValueName,
            optionLabelName
          )
        );

        const handleValueChange = (radioInputValue: string) => {
          const newRadioInputValue =
            radioInputValue === radioGroupValue ? null : radioInputValue;
          setRadioGroupValue(newRadioInputValue);
          const formValue = valueMappingFns.formatFromRadioValToStoredVal(
            newRadioInputValue,
            optionValueName,
            optionLabelName
          );
          field.onChange(formValue);
          onChange?.(formValue);
        };

        return (
          <RadioInputGroup
            ref={ref}
            fieldProps={fieldProps}
            formMethods={formMethods}
            onChange={handleValueChange}
            onBlur={onBlur}
            name={name}
            value={radioGroupValue}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
          >
            {options.map((option) => (
              <RadioInput
                key={option[optionValueName]}
                onBlur={onBlur}
                onChange={handleValueChange}
                optionLabel={option[optionLabelName]}
                optionValue={option[optionValueName]}
                size={size}
                disabled={disabled}
                readOnly={readOnly}
              />
            ))}
          </RadioInputGroup>
        );
      }}
    />
  );
};

const RadioInputEditView = forwardRef(RadioInputEditViewInner) as <
  TData extends FieldValues = FieldValues,
  OptionValueName extends string = "value",
  OptionLabelName extends string = "label"
>(
  props: RadioInputEditViewProps<TData, OptionValueName, OptionLabelName> & {
    ref?: Ref<HTMLElement | null>;
  }
) => ReturnType<typeof RadioInputEditViewInner>;

export default RadioInputEditView;
