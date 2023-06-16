import React from 'react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'

export type RouterProps = React.PropsWithChildren

export default function Router(props: RouterProps): JSX.Element {
  return <BrowserRouter {...props} />
}

export type TestRouterProps = React.ComponentProps<typeof MemoryRouter> & {
  children: React.ReactNode,
}

export function TestRouter(props: TestRouterProps): JSX.Element {
  return <MemoryRouter {...props} />
}
