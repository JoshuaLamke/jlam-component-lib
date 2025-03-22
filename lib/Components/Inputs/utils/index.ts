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