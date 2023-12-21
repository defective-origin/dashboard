// ---| core |---
import { TranslateKeys } from 'locale'

// ---| components |---
import { ImageVariant } from 'components/Image'

export type StatusVariant = 'welcome' | 401 | 403 | 404 | 500 | 502 | 503 | 'default'

export const STATUS_MAP: Record<StatusVariant, {
  image: ImageVariant,
  title: TranslateKeys,
  subtitle: TranslateKeys,
  text?: TranslateKeys,
}> = {
  welcome: {
    image: 'welcome',
    title: 'STATUS.WELCOME.TITLE',
    subtitle: 'STATUS.WELCOME.SUBTITLE',
    text: 'STATUS.WELCOME.TEXT',
  },
  401: {
    image: 400,
    title: 'STATUS.401.TITLE',
    subtitle: 'STATUS.401.SUBTITLE',
  },
  403: {
    image: 400,
    title: 'STATUS.403.TITLE',
    subtitle: 'STATUS.403.SUBTITLE',
  },
  404: {
    image: 400,
    title: 'STATUS.404.TITLE',
    subtitle: 'STATUS.404.SUBTITLE',
  },
  500: {
    image: 500,
    title: 'STATUS.500.TITLE',
    subtitle: 'STATUS.500.SUBTITLE',
  },
  502: {
    image: 500,
    title: 'STATUS.502.TITLE',
    subtitle: 'STATUS.502.SUBTITLE',
  },
  503: {
    image: 500,
    title: 'STATUS.503.TITLE',
    subtitle: 'STATUS.503.SUBTITLE',
  },
  default: {
    image: 500,
    title: 'STATUS.DEFAULT.TITLE',
    subtitle: 'STATUS.DEFAULT.SUBTITLE',
  },
}
