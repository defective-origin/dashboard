import React, { useState } from 'react'

// ---| core |---
import { t } from 'locale'
import { cn } from 'tools'
import { TogglerReturnOptions } from 'hooks'

// ---| screens |---
// ---| components |---
import Button from 'components/actions/Button'
import Dropdown from 'components/actions/Dropdown'
import { IconVariant } from 'components/views/Icon'
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
  actions?: (size: string, o: TogglerReturnOptions) => React.ReactNode
  onSizeChange?: (size: string) => void
}

/**
 * Component description.
 * @example
 * <MarkupBoardAction />
 */
export function MarkupBoardAction(props: MarkupBoardActionProps) {
  const { area, size = '1fr', icon, name, row, column, actions, onSizeChange, children, className, ...otherProps } = props
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
    <Dropdown
      arrow
      title={name as string}
      className={cn(css.MarkupBoardAction, className)}
      size='xxs'
      start={icon}
      tooltip={name}
      v='wrapper'
      style={{ gridArea: area }}
      actions={o =>[
        actions?.(value, o),
        <Button content={t('ACTION.CLOSE')} start='close' color='primary' onClick={() => {
          o.off()
          reset()
        }} />]
      }
      onMouseEnter={highlight}
      onMouseLeave={reset}
      onOpen={highlight}
      onClose={reset}
      disableHoverListener
      {...otherProps}
    >
      <CssSizeField
        label={t('LABEL.SIZE')}
        value={value}
        formats={['fr']}
        onChange={val => {
          setValue(val)
          onSizeChange?.(val)
        }}
      />
      {children}
    </Dropdown>
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
  const index = props.row ?? props.column

  return (
    <MarkupBoardAction
      className={cn(css.MarkupBoardLineSettings, className)}
      name={t('ACTION.SETUP_LINE')}
      icon='settings'
      actions={size => [
        <Button content={t('ACTION.SAVE')} start='save' color='success' onClick={() => index && onSave?.(index, size)} />,
        <Button content={t('ACTION.REMOVE')} start='delete' color='error' onClick={() => index && onRemove?.(index)} />,
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

  return (
    <MarkupBoardAction
      className={cn(css.MarkupBoardLineSettings, className)}
      name={t('ACTION.ADD_LINE')}
      icon='health_cross'
      actions={size => [
        <Button content={t('LABEL.ROW')} start='splitscreen_left' color='success' onClick={() => typeof props.row === 'number' && onRowAdd?.(props.row, size)} />,
        <Button content={t('LABEL.COLUMN')} start='splitscreen_top' color='info' onClick={() => typeof props.column === 'number' && onColumnAdd?.(props.column, size)} />,
      ]}
      {...otherProps}
    />
  )
}
