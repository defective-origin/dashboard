import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './Image.module.scss'

// TODO: preload all images? https://stackoverflow.com/questions/3646036/preloading-images-with-javascript
export const IMAGE_MAP = {
  400: 'https://png.pngtree.com/png-vector/20230416/ourmid/pngtree-unicorn-full-body-beautiful-pattern-png-image_6704420.png',
  500: 'https://d1k5j68ob7clqb.cloudfront.net/processed/with_watermark/6d3H7wV3NUrpA7.png',
  welcome: 'https://www.dndbeyond.com/avatars/thumbnails/30836/227/1000/1000/638063931763028274.png',
  'short logo': 'https://lightning.ai/static/media/logo-torchmetrics.51a712e2b231ca9211e4b19dea16bb02.svg',
  'full logo': 'https://warehouse-camo.ingress.us-east-2.pypi.io/d41af6b7b6893ab8be1479f1136910a18c268ceb/68747470733a2f2f6769746875622e636f6d2f4c696768746e696e672d41492f746f7263686d6574726963732f7261772f76312e302e312f646f63732f736f757263652f5f7374617469632f696d616765732f6c6f676f2e706e67',
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
