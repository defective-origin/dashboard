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
export function LocaleProvider(props: LocaleProviderProps): JSX.Element {
  return <I18nextProvider i18n={i18next} {...props} />
}

LocaleProvider.displayName = 'LocaleProvider'

export default LocaleProvider

