import React from "react";
import type { Preview } from "@storybook/react";
import ThemeProvider from '../src/theme'
import { BrowserRouter } from '../src/router'
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { withThemeByClassName } from '@storybook/addon-themes';
import { AppProvider } from '../src/App/App.context'
import { useAccount } from '../src/api'

import "./index.scss";

const StorybookLauncher = ({ children, theme = undefined }) => {
  const account = useAccount()

  return (
    <AppProvider account={account}>
      <BrowserRouter>
        {/* Mui injectFirst doesn't work with this decorator */}
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </AppProvider>
  )
}

export const decorators = [
  (Story) => (
    <StorybookLauncher>
        <Story />
    </StorybookLauncher>
  ),
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
          <StorybookLauncher theme={context.store.globals.globals.theme}>
            <DocsContainer context={context} {...other} />
          </StorybookLauncher>
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
