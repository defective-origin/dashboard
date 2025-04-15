import React, { useRef, useState } from 'react'

// ---| core |---
import { t } from 'locale'
import { cn } from 'tools'
import { TogglerReturnOptions } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Popup from 'components/popups/Popup'
import { IconVariant } from 'components/views/Icon'
import Button, { ButtonProps } from 'components/actions/Button'
import { CssSizeField } from 'components/forms/fields/CssSizeField'

// ---| self |---
import css from './MarkupBoardAction.module.scss'
import { markupLineManager } from '../MarkupBoardLine/MarkupBoardLine.hooks'


export type MarkupBoardActionProps = {
  name?: React.ReactNode
  icon?: IconVariant
  size?: string
  row?: number
  column?: number
  area?: string
  className?: string
  children?: React.ReactNode
  actions?: (size: string, o: TogglerReturnOptions) => ButtonProps[]
  onSizeChange?: (size: string) => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <MarkupBoardAction />
 */
export function MarkupBoardAction(props: MarkupBoardActionProps) {
  const { area, size = '1fr', icon, name, row, column, actions, onSizeChange, children, className, ...otherProps } = props
  const _className = cn(css.MarkupBoardAction, className)
  const [value, setValue] = useState(size)
  // TODO: do via form and onChange(form)

  const highlight = () => {
    markupLineManager.highlight('row', row)
    markupLineManager.highlight('column', column)
  }

  const reset = () => {
    markupLineManager.reset('row', row)
    markupLineManager.reset('column', column)
  }

  return (
    <Popup
      arrow
      title={name}
      actions={o => [
        ...actions?.(value, o) ?? [],
        {
          content: t('ACTION.CLOSE'), start: 'close', onClick: () => {
            o.off()
            reset()
          },
        },
      ]}
      trigger={o => (
        <Button
          className={_className}
          size='xxs'
          start={icon}
          tooltip={name}
          active={o.isOn}
          onClick={o.toggle}
          style={{ gridArea: area }}
          onMouseEnter={highlight}
          onMouseLeave={() => {
            if (o.isOff) {
              reset()
            }
          }}
          {...otherProps}
        />
      )}
      onOpen={highlight}
      onClose={reset}
      disableHoverListener
    >
      <CssSizeField
        label={t('LABEL.SIZE')}
        value={value}
        onChange={val => {
          setValue(val)
          onSizeChange?.(val)
        }}
      />
      {children}
    </Popup>
  )
}

MarkupBoardAction.displayName = 'MarkupBoardAction'


export default MarkupBoardAction


export type MarkupBoardSetupLineProps = MarkupBoardActionProps & {
  onRemove?: (index: number) => void
  onSave?: (index: number, size: string) => void
  onSizeChange?: (index: number, size: string) => void
}

export function MarkupBoardSetupLine(props: MarkupBoardSetupLineProps) {
  const { onSave, onRemove, onSizeChange, className, ...otherProps } = props
  const _className = cn(css.MarkupBoardLineSettings, className)
  const index = props.row ?? props.column

  return (
    <MarkupBoardAction
      className={_className}
      name={t('ACTION.SETUP_LINE')}
      icon='settings'
      actions={size => [
        { content: t('ACTION.SAVE'), start: 'save', color: 'success', onClick: () => index && onSave?.(index, size) },
        { content: t('ACTION.REMOVE'), start: 'delete', color: 'error', onClick: () => index && onRemove?.(index) },
      ]}
      onSizeChange={size => index && onSizeChange?.(index, size)}
      {...otherProps}
    />
  )
}

export type MarkupBoardAddLineProps = MarkupBoardActionProps & {
  onRowAdd?: (index: number, size: string) => void
  onColumnAdd?: (index: number, size: string) => void
}

export function MarkupBoardAddLine(props: MarkupBoardAddLineProps) {
  const { onRowAdd, onColumnAdd, className, ...otherProps } = props
  const _className = cn(css.MarkupBoardLineSettings, className)

  return (
    <MarkupBoardAction
      className={_className}
      name={t('ACTION.ADD_LINE')}
      icon='health_cross'
      actions={size => [
        { content: t('LABEL.ROW'), start: 'splitscreen_left', color: 'success', onClick: () => typeof props.row === 'number' && onRowAdd?.(props.row, size) },
        { content: t('LABEL.COLUMN'), start: 'splitscreen_top', color: 'info', onClick: () => typeof props.column === 'number' && onColumnAdd?.(props.column, size) },
      ]}
      {...otherProps}
    />
  )
}
