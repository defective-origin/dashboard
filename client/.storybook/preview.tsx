import React from "react";
import type { Preview } from "@storybook/react";
import ThemeProvider from '../src/theme'
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { withThemeByClassName } from '@storybook/addon-themes';

import "./index.scss";


export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];

const preview: Preview = {
  parameters: {
    docs: {
      container: ({ context, ...other }) => {
        // It's hack. Decorators doesn't work with mdx files without any stories
        return (
          <ThemeProvider current={context.store.globals.globals.theme}>
            <DocsContainer context={context} {...other} />
          </ThemeProvider>
        )
      },
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
