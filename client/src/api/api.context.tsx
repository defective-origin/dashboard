import { QueryClient, QueryClientProvider, QueryClientProviderProps } from '@tanstack/react-query'

// ---| self |---


export { QueryClient } from '@tanstack/react-query'

export const CLIENT = new QueryClient()

export type ApiProviderProps = Partial<QueryClientProviderProps>

/**
 * Setup Api context.
 *
 * How to use
 * @example
 * <ApiProvider defaultProp={1} />
 */
function ApiProvider(props: ApiProviderProps) {
  const { client = CLIENT, ...otherProps } = props

  return <QueryClientProvider client={client} {...otherProps} />
}

ApiProvider.displayName = 'ApiProvider'

export default ApiProvider

