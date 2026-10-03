import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { withSkeleton } from 'components/views/Skeleton'

// ---| self |---
import css from './Media.module.scss'


export const MEDIA_MAP = {
  400: 'https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-unicorn-full-body-beautiful-pattern-png-image_6704420.png',
  500: 'https://d1k5j68ob7clqb.cloudfront.net/processed/with_watermark/6d3H7wV3NUrpA7.png',
  empty: 'https://www.dndbeyond.com/avatars/thumbnails/30836/227/1000/1000/638063931763028274.png',
  error: 'https://png.pngtree.com/png-vector/20231113/ourmid/pngtree-error-rubber-stamp-mistake-png-image_10428685.png',
  logo: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1426633865/die6a2gp9buarvojwxk9.png',
} // TODO: generatePath(import.meta.env.VITE_CDN_URL, { type, id })

export type MediaVariant = keyof typeof MEDIA_MAP
export type MediaProps = {
  v?: MediaVariant
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  className?: string
}

/**
 * Allows to view images, svg, gif, video, sound and other media content.
 * @example
 * <Media />
 */
export const Media = withSkeleton((props: MediaProps) => {
  const { width, height, v, src, alt, className, ...otherProps } = props
  const imgSrc = src ?? MEDIA_MAP[v as MediaVariant]

  // TODO: change tag depends on content, svg, img, video, sound and other
  return (
    <img
      className={cn(css.Media, className)}
      src={imgSrc}
      alt={alt}
      style={{ width, height }}
      {...otherProps}
    />
  )
}, () => ({ v: 'rounded', wrap: true }))

Media.displayName = 'Media'


export default Media
