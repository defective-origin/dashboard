import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Id, useUser } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'
import Avatar from 'components/Avatar'
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './User.module.scss'

export type UserProps = BlockProps & {
  id?: Id
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <User />
 */
export function User(props: UserProps): JSX.Element {
  const { id, className, ...otherProps } = props
  const _className = cn(css.User, className)
  const user = useUser(id)

  return (
    <Block v='x' g='xs' aligns='center' className={_className} {...otherProps}>
      <Avatar alt='user 4' size='lg' src={user.image} />
      <Text content={user.name ?? user.email} size='xs' nowrap />
    </Block>
  )
}

User.displayName = 'User'

export default User
