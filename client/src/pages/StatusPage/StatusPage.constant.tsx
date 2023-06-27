import { BannerProps } from 'components/Banner'

export type StatusType = 0 | 401 | 403 | 404 | 500 | 502 | 503 | 'default'

const image500 = 'https://d1k5j68ob7clqb.cloudfront.net/processed/with_watermark/6d3H7wV3NUrpA7.png'
const image400 = 'https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-unicorn-full-body-beautiful-pattern-png-image_6704420.png'
export const STATUS_MAP: Record<StatusType, BannerProps> = {
  0: {
    src: 'https://www.dndbeyond.com/avatars/thumbnails/30836/227/1000/1000/638063931763028274.png',
    title: `WELCOME TO OUR APP!`,
    subtitle: 'Please read the guide before start work.',
    text: 'insert button links to guide and dashboard page',
  },
  401: {
    src: image400,
    title: 'NOT AUTHORIZED!',
    subtitle: `Sorry but it seems like we can't let you in.`,
  },
  403: {
    src: image400,
    title: 'YOU HAVE NO PERMISSION!',
    subtitle: `Sorry but it seems like we can't let you in.`,
  },
  404: {
    src: image400,
    title: `OOOOPS! WE COULDN'T FIND THIS PAGE!`,
    subtitle: 'It could be deleted or never existed.',
  },
  500: {
    src: image500,
    title: '500 ERROR! SOMETHING WENT WRONG!',
    subtitle: 'TEXT_500',
  },
  502: {
    src: image500,
    title: 'BAD GATEWAY!',
    subtitle: 'TEXT_500',
  },
  503: {
    src: image500,
    title: 'SERVICE UNAVAILABLE!',
    subtitle: 'TEXT_500',
  },
  default: {
    src: image500,
    title: 'SOMETHING WENT WRONG!',
    subtitle: `Looks like we are having some issues. We'll get it fixed as soon as possible. Please try again later.`,
  },
}
