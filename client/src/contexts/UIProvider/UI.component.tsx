import React, { useMemo, useState } from 'react'

// ---| self |---
import { DEFAULT_UI_CONF, UIContext } from './UI.context'

export default function UIProvider(props = DEFAULT_UI_CONF): JSX.Element {
  const [theme, setTheme] = useState(props.theme)
  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <UIContext.Provider value={value} />
}
