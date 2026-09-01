import React from 'react'
import { I18nextProvider, I18nextProviderProps } from 'react-i18next'

// ---| self |---
import i18next from './locale.conf'

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

  return <I18nextProvider i18n={i18next} {...otherProps} />
}

LocaleProvider.displayName = 'LocaleProvider'

export default LocaleProvider

