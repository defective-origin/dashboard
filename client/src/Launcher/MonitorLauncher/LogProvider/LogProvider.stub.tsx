import React from 'react'
import {
  DEFAULT_LOG_PROVIDER_OPTIONS,
  LogProviderContext,
  LogProviderOptions,
} from './LogProvider.context'

export type LogProviderStubProps = React.PropsWithChildren & {
  value?: Partial<LogProviderOptions>
}

export function LogProviderStub(props: LogProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_LOG_PROVIDER_OPTIONS, ...value }

  return <LogProviderContext.Provider value={combinedValue} children={children} />
}

export default LogProviderStub
