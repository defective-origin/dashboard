import React, { useEffect } from 'react'
import { I18nextProvider, I18nextProviderProps } from 'react-i18next'

// ---| self |---
import i18next from './locale.conf'

import './locale.module.scss'

export type LocaleProviderProps = React.PropsWithChildren & Partial<I18nextProviderProps>

/**
 * Setup LocaleProvider context.
 *
 * How to use
 * @example
 * <LocaleProvider defaultProp={1} />
 */
export function LocaleProvider(props: LocaleProviderProps) {
  const { i18n = i18next, ...otherProps } = props

  // auto rotate text and layout content if language is rtl
  // In most cases is used for arrow icons but image rotation is forbidden
  useEffect(() => {
    const update = (language: string) => {
      document.documentElement.dir = i18n.dir(language)
      document.documentElement.lang = language
    }

    update(i18n.language)

    i18next.on('languageChanged', update)

    return i18n.off('languageChanged', update)
  }, [i18n])


  return <I18nextProvider i18n={i18n} {...otherProps} />
}

LocaleProvider.displayName = 'LocaleProvider'

export default LocaleProvider

