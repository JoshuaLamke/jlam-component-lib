import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.stubGlobal('console', {
  ...console,
  warn: (message: unknown) => {
    if (
      typeof message === 'string' &&
      message.includes('If you do not provide a visible label, you must specify an aria-label or aria-labelledby')
    ) {
      return; // Suppress label warning when testing specific components without the field wrapper
    }
    console.warn(message); 
  },
});