import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Image.module.scss'

export const IMAGE_MAP = {
  400: 'https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-unicorn-full-body-beautiful-pattern-png-image_6704420.png',
  500: 'https://d1k5j68ob7clqb.cloudfront.net/processed/with_watermark/6d3H7wV3NUrpA7.png',
  welcome: 'https://www.dndbeyond.com/avatars/thumbnails/30836/227/1000/1000/638063931763028274.png',
}

export type ImageTypes = keyof typeof IMAGE_MAP

export type ImageProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  className?: string
  children?: React.ReactNode
  type?: ImageTypes
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Image />
 */
export function Image(props: ImageProps): JSX.Element {
  const { type, src, children, className, ...otherProps } = props
  const _className = cn('image', className)
  const imgSrc = src ?? IMAGE_MAP[type as ImageTypes]

  return <img className={_className} src={imgSrc} {...otherProps}>{children}</img>
}

Image.displayName = 'Image'

export default Image
