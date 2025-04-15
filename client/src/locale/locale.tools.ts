export const LOCALE_CODE_SPLIT_REGEXP = /[-_]/

export type LocaleCode = {
  code: string
  locale: string
  region?: string
}

export function getLocaleCode(defaultLocaleCode?: string): LocaleCode {
  const code = defaultLocaleCode
      || navigator.language
      ||(navigator.languages && navigator.languages[0])

  return {
    code,
    locale: code.split(LOCALE_CODE_SPLIT_REGEXP)[0],
    region: code.split(LOCALE_CODE_SPLIT_REGEXP)[1],
  }
}
