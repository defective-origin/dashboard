import React from 'react'
import {
  DEFAULT_A_B_TEST_PROVIDER_OPTIONS,
  ABTestProviderContext,
  ABTestProviderOptions,
} from './ABTestProvider.context'

export type ABTestProviderStubProps = React.PropsWithChildren & {
  value?: Partial<ABTestProviderOptions>
}

export function ABTestProviderStub(props: ABTestProviderStubProps): JSX.Element {
  const { value, children } = props
  const combinedValue = { ...DEFAULT_A_B_TEST_PROVIDER_OPTIONS, ...value }

  return <ABTestProviderContext.Provider value={combinedValue} children={children} />
}

export default ABTestProviderStub
