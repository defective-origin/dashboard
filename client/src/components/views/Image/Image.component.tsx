import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { withSkeleton } from 'components/views/Skeleton'

// ---| self |---
import './Image.module.scss'

// TODO: preload all images? https://stackoverflow.com/questions/3646036/preloading-images-with-javascript
export const IMAGE_MAP = {
  400: 'https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-unicorn-full-body-beautiful-pattern-png-image_6704420.png',
  500: 'https://d1k5j68ob7clqb.cloudfront.net/processed/with_watermark/6d3H7wV3NUrpA7.png',
  empty: 'https://www.dndbeyond.com/avatars/thumbnails/30836/227/1000/1000/638063931763028274.png',
  error: 'https://png.pngtree.com/png-vector/20231113/ourmid/pngtree-error-rubber-stamp-mistake-png-image_10428685.png',
  logo: 'https://images.crunchbase.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1426633865/die6a2gp9buarvojwxk9.png',
}

export type ImageVariant = keyof typeof IMAGE_MAP

export type ImageProps = {
  className?: string
  children?: React.ReactNode
  v?: ImageVariant
  src?: string
  width?: string | number
  height?: string | number
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Image />
 */
export function Image(props: ImageProps) {
  const { width, height, v, src, children, className, ...otherProps } = props
  const _className = cn('image', className)
  const imgSrc = src ?? IMAGE_MAP[v as ImageVariant]

  return (
    <img className={_className} src={imgSrc} style={{ width, height }} {...otherProps}>
      {children}
    </img>
  )
}

Image.displayName = 'Image'

export default withSkeleton(Image, () => ({ v: 'rounded', wrap: true }))
