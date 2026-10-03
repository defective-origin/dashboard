import React from 'react'

// ---| core |---
import { cn, react } from 'tools'
import { AppLink } from 'router'

// ---| components |---
import Link from 'components/actions/Link'
import Dropdown from 'components/actions/Dropdown'
import Block, { BlockProps } from 'components/layouts/Block'
import Button, { ButtonProps } from 'components/actions/Button'

// ---| self |---
import css from './Actions.module.scss'


export type ActionsProps = BlockProps & Pick<ButtonProps, 'size' | 'color'> & {
  /** Add border and separate actions by divider */
  group?: boolean
  action?: ButtonProps['v']
}

/**
 * Component description.
 * @example
 * <Actions size='md' tooltipSide='right' color='primary'>
 *   <CustomItem />
 *   <Actions.Button tooltip='Edit' start='tv' />,
 *   <Actions.Button tooltip='Full screen' start='fullscreen' />,
 *   <Divider />
 *   <Actions.Link tooltip='Add Widget' start='add' />,
 *   <Actions.Link tooltip='Resize' start='computer' />,
 *   <Actions.Dropdown tooltip='Docs' start='book'>
 *     <Actions.Link tooltip='Full screen' start='fullscreen' />,
 *     <Actions.Dropdown tooltip='Add Widget' start='add'>
 *        <Actions.Link tooltip='Full screen' start='fullscreen' />,
 *     </Actions.Dropdown>
 *   </Actions.Dropdown>
 *   <Divider />
 *   <Actions.AppLink tooltip='Remove' start='delete' />,
 *   <Actions.AppLink tooltip='Add to Menu' start='beenhere' />,
 *   <Actions.AppLink tooltip='Settings' start='settings' />,
 * </Actions>
 */
export function Actions(props: ActionsProps) {
  const { size = 'xs', action, color, tooltipSide, group, children, className, ...otherProps } = props

  // TODO: wrap into dropdown button if content not fit in area

  return (
    <Block className={cn(css.Actions, group && css.group, className)} aligns='center' v='x' {...otherProps}>
      {react.injectProp(children, 1, { size, tooltipSide, color, v: action }, node => react.isExemplar(node, [Link, AppLink, Button, Dropdown]))}
    </Block>
  )
}

Actions.displayName = 'Actions'

Actions.Link = Link
Actions.AppLink = AppLink
Actions.Button = Button
Actions.Dropdown = Dropdown

export default Actions
