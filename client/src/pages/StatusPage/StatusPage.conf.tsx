import { TranslateKeys } from 'locale'

export type StatusType = 0 | 401 | 403 | 404 | 500 | 502 | 503 | 'default'

// TODO: CRETAE IMAGE_URL_MAPS?  OR move  to Image  component?
const IMAGE_500 = 'https://d1k5j68ob7clqb.cloudfront.net/processed/with_watermark/6d3H7wV3NUrpA7.png'
const IMAGE_400 = 'https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-unicorn-full-body-beautiful-pattern-png-image_6704420.png'

export const STATUS_MAP: Record<StatusType, {
  src: string,
  title: TranslateKeys,
  subtitle: TranslateKeys,
  text?: TranslateKeys,
}> = {
  0: {
    src: 'https://www.dndbeyond.com/avatars/thumbnails/30836/227/1000/1000/638063931763028274.png',
    title: 'STATUS.0.TITLE',
    subtitle: 'STATUS.0.SUBTITLE',
    text: 'STATUS.0.TEXT',
  },
  401: {
    src: IMAGE_400,
    title: 'STATUS.401.TITLE',
    subtitle: 'STATUS.401.SUBTITLE',
  },
  403: {
    src: IMAGE_400,
    title: 'STATUS.403.TITLE',
    subtitle: 'STATUS.403.SUBTITLE',
  },
  404: {
    src: IMAGE_400,
    title: 'STATUS.404.TITLE',
    subtitle: 'STATUS.404.SUBTITLE',
  },
  500: {
    src: IMAGE_500,
    title: 'STATUS.500.TITLE',
    subtitle: 'STATUS.500.SUBTITLE',
  },
  502: {
    src: IMAGE_500,
    title: 'STATUS.502.TITLE',
    subtitle: 'STATUS.502.SUBTITLE',
  },
  503: {
    src: IMAGE_500,
    title: 'STATUS.503.TITLE',
    subtitle: 'STATUS.503.SUBTITLE',
  },
  default: {
    src: IMAGE_500,
    title: 'STATUS.DEFAULT.TITLE',
    subtitle: 'STATUS.DEFAULT.SUBTITLE',
  },
}
