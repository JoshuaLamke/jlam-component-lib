import type { Replacement } from '@react-input/mask';

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const objCopy = { ...obj };

  keys.forEach((key) => {
    delete objCopy[key];
  });

  return objCopy;
};

interface MaskFormatOptions {
  mask: string;
  replacement: Replacement | string;
  separate?: boolean;
  showMask?: boolean;
}

export function format(input: string, { mask, replacement, separate, showMask }: MaskFormatOptions): string {
  let position = 0;
  let formattedValue = '';
  
  if(typeof replacement === "string") {
    replacement = {
      [replacement]: /./,
    } as Replacement;
  }

  for (const char of mask) {
    if (!showMask && input[position] === undefined) {
      break;
    }

    const isReplacementKey = Object.prototype.hasOwnProperty.call(replacement, char);

    if (isReplacementKey && input[position] !== undefined) {
      formattedValue += input[position++];
    } else {
      formattedValue += char;
    }
  }

  if (separate && !showMask) {
    let index = mask.length - 1;

    for (; index >= 0; index--) {
      if (formattedValue[index] !== mask[index]) {
        break;
      }
    }

    formattedValue = formattedValue.slice(0, index + 1);
  }

  return formattedValue;
}

// Utility to convert a union type to an intersection type (used to detect unions)
type UnionToIntersection<U> = 
  (U extends any ? (x: U) => void : never) extends ((x: infer I) => void) ? I : never;

// Utility type to check if a type is a union type
type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

// The SelectOption type
export type SelectOption<
  OptionValueName extends string = 'value',
  OptionLabelName extends string = 'label'
> = IsUnion<OptionValueName> extends true
  ? never // Disallow union types for OptionValueName
  : IsUnion<OptionLabelName> extends true
  ? never // Disallow union types for OptionLabelName
  : {
      // If no union types, use the keys OptionValueName and OptionLabelName
      [K in OptionValueName | OptionLabelName]: string;
    } & {
      // Allow any other keys with the `string` value type
      [key: string]: any;
    };

export type Size = "sm" | "md" | "lg" | "xl";

export type SizeStyles = {
  inputHeight: string;
  inputFontSize: string;
  radioSvgSize: number;
  radioButtonSize: number;
  radioButtonRadius: number;
  radioFocusRadius: number;
  radioSelectedStrokeWidth: number;
  fieldLabelTextSize: string;
  fieldHelperTextSize: string;
  defaultTooltipIconSize: number;
}

export const sizeStyleMap: Record<Size, SizeStyles> = {
  sm: {
    inputHeight: "h-7",
    inputFontSize: "text-sm",
    radioSvgSize: 20,
    radioButtonSize: 10,
    radioButtonRadius: 7,
    radioFocusRadius: 9,
    radioSelectedStrokeWidth: 4.5,
    fieldLabelTextSize: "text-xs",
    fieldHelperTextSize: "text-xs",
    defaultTooltipIconSize: 12,
  },
  md: {
    inputHeight: "h-8",
    inputFontSize: "",
    radioSvgSize: 24,
    radioButtonSize: 12,
    radioButtonRadius: 8,
    radioFocusRadius: 10,
    radioSelectedStrokeWidth: 5,
    fieldLabelTextSize: "text-sm",
    fieldHelperTextSize: "text-xs",
    defaultTooltipIconSize: 14,
  },
  lg: {
    inputHeight: "h-9",
    inputFontSize: "text-lg",
    radioSvgSize: 28,
    radioButtonSize: 14,
    radioButtonRadius: 9,
    radioFocusRadius: 11,
    radioSelectedStrokeWidth: 5.5,
    fieldLabelTextSize: "",
    fieldHelperTextSize: "text-xs",
    defaultTooltipIconSize: 16,
  },
  xl: {
    inputHeight: "h-10",
    inputFontSize: "text-xl",
    radioSvgSize: 32,
    radioButtonSize: 16,
    radioButtonRadius: 10,
    radioFocusRadius: 12,
    radioSelectedStrokeWidth: 6,
    fieldLabelTextSize: "text-lg",
    fieldHelperTextSize: "text-sm",
    defaultTooltipIconSize: 18,
  }
}