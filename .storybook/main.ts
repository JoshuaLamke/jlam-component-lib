import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  typescript: {
    reactDocgenTypescriptOptions: {
      tsconfigPath: './tsconfig.json',
      shouldExtractValuesFromUnion: true
    },
  },
  "stories": [
    "../lib/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
};
export default config;