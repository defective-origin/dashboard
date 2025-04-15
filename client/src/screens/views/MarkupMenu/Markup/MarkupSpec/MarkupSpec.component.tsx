import React from 'react'

// ---| core |---
import { t } from 'locale'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
import { MarkupOptions, toItems } from 'screens/views/MarkupBoard'
// ---| components |---
import Spec from 'components/views/Spec'

// ---| self |---
import css from './MarkupSpec.module.scss'

export type MarkupSpecProps = {
  options?: MarkupOptions
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <MarkupSpec />
 */
export function MarkupSpec(props: MarkupSpecProps) {
  const { options, children, className, ...otherProps } = props
  const _className = cn(css.MarkupSpec, className)

  return (
    <div className={_className} {...otherProps}>
      <Spec name={t('LABEL.MARKUP.WIDTH')} content={options?.width} />
      <Spec name={t('LABEL.MARKUP.HEIGHT')} content={options?.height} />
      <Spec name={t('LABEL.MARKUP.COLUMNS')} content={options?.columns.length} />
      <Spec name={t('LABEL.MARKUP.ROWS')} content={options?.rows.length} />
      <Spec name={t('LABEL.MARKUP.GAP')} content={options?.gap} />
      <Spec name={t('LABEL.MARKUP.ITEMS')} content={toItems(options).length} />

      {children}
    </div>

  )
}

MarkupSpec.displayName = 'MarkupSpec'


export default MarkupSpec
