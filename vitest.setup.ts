import '@testing-library/jest-dom';
import { vi } from 'vitest';

const originalWarn = console.warn;

vi.stubGlobal('console', {
  ...console,
  warn: (message: unknown) => {
    if (
      typeof message === 'string' &&
      message.includes('If you do not provide a visible label, you must specify an aria-label or aria-labelledby')
    ) {
      return; // Suppress warning about label for when testing components without field wrapper
    }
    originalWarn(message);
  },
});