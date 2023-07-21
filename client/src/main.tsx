import React from 'react'
import ReactDOM from 'react-dom/client'

// ---| pages |---
import App from 'App'

// ---| root |---
import Launcher from 'Launcher'
import i18next, { Languages, t } from 'locale'

const actions = {
  t: (state: any, ...args: any) => t(...args),
  changeLanguage: (state: any, language: any) => {
    state.merge({ language, languages: i18next.languages as Languages[] })
    i18next.changeLanguage(language)
  },
  addHotkey: (state: any, key: any, handler: any) => state.merge({ hotkeys: { ...state.hotkeys, [key]: handler } }),
  removeHotkey: (state: any, key: any) => {
    const hotkeys = { ...state.hotkeys }

    delete hotkeys[key]

    state.merge({ hotkeys })
  },
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Launcher actions={actions as any}>
    <App />
  </Launcher>,
)
