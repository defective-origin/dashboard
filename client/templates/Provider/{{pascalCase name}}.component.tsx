import React, { useMemo, useState } from 'react'

// ---| self |---
import { {{pascalCase name}}Context } from './{{pascalCase name}}.context'

export type {{pascalCase name}}Props = React.PropsWithChildren

export function {{pascalCase name}}(props: {{pascalCase name}}Props): JSX.Element {
  const [user, setUser] = useState<null | string>(null)

  const options = useMemo(() => ({
    user,
    login: () => setUser('user'),
    logout: () => setUser(null),
    isAuthorized: !!user,
  }), [user])

  return <{{pascalCase name}}Context.Provider value={options} {...props} />
}

export default {{pascalCase name}}
