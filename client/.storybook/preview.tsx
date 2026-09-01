import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import ThemeProvider, { ThemeProviderProps } from '../src/theme'
import LocaleProvider from '../src/locale'
import { BrowserRouter } from '../src/router'
import ApiProvider from '../src/api/api.context'
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { withThemeByClassName } from '@storybook/addon-themes';

import "./index.scss";

const StorybookLauncher = ({ children, theme }: ThemeProviderProps) => {
  return (
    <BrowserRouter>
      <ApiProvider>
        <LocaleProvider>
          {/* Mui injectFirst doesn't work with this decorator */}
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </LocaleProvider>
      </ApiProvider>
    </BrowserRouter>
  )
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      return (
      <StorybookLauncher theme={context.globals.theme}>
        <Story />
      </StorybookLauncher>
    )
    },
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    docs: {
      container: ({ context, ...other }) => {
        // 1. Trying to retrieve the theme from deep hidden fields of the Storybook store (for pure MDX)
        // In SB 8.3+, this is usually userGlobals; in earlier versions, it's store.globals
        const storeGlobals = 
          (context as any).store?.userGlobals?.globals || 
          (context as any).store?.globals?.globals || 
          (context as any).store?.globals;

        const currentTheme = storeGlobals?.theme || context.globals?.theme || "light";

        // It's hack. Decorators doesn't work with mdx files without any stories
        return (
          <StorybookLauncher theme={currentTheme}>
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
