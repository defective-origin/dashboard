import React, { useMemo, useState } from 'react'

// ---| self |---
import { LocaleProviderContext, LocaleProviderOptions, LocaleProviderState } from './LocaleProvider.context'
import i18next, { I18nextProvider, Languages, t } from 'locale'

export type LocaleProviderProps = React.PropsWithChildren

export function LocaleProvider(props: LocaleProviderProps): JSX.Element {
  const { children } = props
  const [current, setCurrent] = useState<LocaleProviderState>(i18next.language as Languages)

  const options = useMemo<LocaleProviderOptions>(() => ({
    current,
    languages: i18next.languages as Languages[],
    t,
    change: (locale) => {
      // TODO: analytics.register({ name: 'Locale', value: locale })
      setCurrent(locale)
      i18next.changeLanguage(locale as string)
    },
  }), [current])

  return (
    <LocaleProviderContext.Provider value={options}>
      <I18nextProvider i18n={i18next}>
        {children}
      </I18nextProvider>
    </LocaleProviderContext.Provider>
  )
}

LocaleProvider.displayName = 'LocaleProvider'

export default LocaleProvider
