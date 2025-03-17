import type { Preview } from '@storybook/react'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
      expanded: true,
      sort: "alpha",
    },
  },
};

export default preview;