import React, { useCallback, useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { emitEvent, useEvent } from 'hooks'

// ---| components |---
import Button, { ButtonProps } from 'components/actions/Button'

// ---| self |---
import css from './Clipboard.module.scss'

export type ClipboardProps = ButtonProps

/**
 * Component description.
 * @example
 * <Clipboard />
 */
export function Clipboard(props: ClipboardProps) {
  const { content, className, ...otherProps } = props
  const [isActive, setIsActive] = useState<boolean>()
  const tooltip = isActive ? `Copied: ${content}` : `Copy: ${content}`

  const copy = useCallback(() => {
    if (content) {
      navigator.clipboard.writeText(content.toString())
        .then(() => emitEvent(['clipboard', 'copy']))
    }
  }, [content])

  useEvent(['clipboard', 'copy'], () => {
    navigator.clipboard.readText()
      .then(value => setIsActive(content?.toString() === value))
  }, { disable: !content })

  return (
    <Button
      start='content_copy'
      tooltip={tooltip}
      active={isActive}
      className={cn(css.Clipboard, className)}
      onClick={copy}
      {...otherProps}
    />
  )
}

Clipboard.displayName = 'Clipboard'

export default Clipboard
