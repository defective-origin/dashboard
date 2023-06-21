import React from 'react'
import { {{pascalCase name}}Context, {{pascalCase name}}Options } from './{{pascalCase name}}.context'

export const {{pascalCase name}}OptionSpy: {{pascalCase name}}Options = {
  user: 'string',
  login: jest.fn(),
  logout: jest.fn(),
  isAuthorized: true
}

export type {{pascalCase name}}StubProps = React.PropsWithChildren & { value?: {{pascalCase name}}Options }

export function {{pascalCase name}}Stub(props: {{pascalCase name}}StubProps): JSX.Element {
  const { value, children } = props

  return <{{pascalCase name}}Context.Provider value={{ ...{{pascalCase name}}OptionSpy, ...value }} children={children} />
}

export default {{pascalCase name}}Stub
