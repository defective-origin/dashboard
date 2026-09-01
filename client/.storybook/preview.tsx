import React from "react";
import type { Preview } from "@storybook/react";
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { withThemeByClassName } from '@storybook/addon-themes';

// ---| core |---
import { MockLauncher } from '../src/App/App.launcher'

import "./index.scss";

const preview: Preview = {
  decorators: [
    (Story, context) => {
      return (
      <MockLauncher theme={context.globals.theme}>
        <Story />
      </MockLauncher>
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
    layout: 'centered',
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
          <MockLauncher theme={currentTheme}>
            <DocsContainer context={context} {...other} />
          </MockLauncher>
        )
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
