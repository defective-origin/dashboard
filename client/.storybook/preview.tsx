import React from "react";
import type { Preview } from "@storybook/react";
import { themes } from '@storybook/theming';
import { withThemeByClassName } from "@storybook/addon-styling";
import ThemeProvider from '../src/theme'

import "./index.scss";


export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];

// TODO: hide addons panel for all stories
const preview: Preview = {
  parameters: {
    docs: {
      theme: themes.light,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
};

export default preview;
