import { QueryClient, QueryClientProvider, QueryClientProviderProps } from '@tanstack/react-query'

// ---| self |---

export const apiClient = new QueryClient()

export type ApiProviderProps = Partial<QueryClientProviderProps>

/**
 * Setup Api context.
 *
 * How to use
 * @example
 * <ApiProvider defaultProp={1} />
 */
function ApiProvider(props: ApiProviderProps) {
  return <QueryClientProvider client={apiClient} {...props} />
}

ApiProvider.displayName = 'ApiProvider'

export default ApiProvider

