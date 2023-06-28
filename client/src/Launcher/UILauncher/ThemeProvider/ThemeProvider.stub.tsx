import React from 'react'
import {
  DEFAULT_THEME_PROVIDER_OPTIONS,
  ThemeProviderContext,
  ThemeProviderOptions,
} from './ThemeProvider.context'

export type ThemeProviderStubProps = React.PropsWithChildren & {
  value?: Partial<ThemeProviderOptions>
}

export function ThemeProviderStub(props: ThemeProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_THEME_PROVIDER_OPTIONS, ...value }

  return <ThemeProviderContext.Provider value={combinedValue} children={children} />
}

export default ThemeProviderStub
