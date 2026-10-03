import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Id, useUser } from 'api'

// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Avatar from 'components/views/Avatar'
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './User.module.scss'

export type UserProps = BlockProps & {
  id?: Id
}

/**
 * Component description.
 * @example
 * <User />
 */
export function User(props: UserProps) {
  const { id, className, ...otherProps } = props
  const user = useUser(id)

  return (
    <Block className={cn(css.User, className)} v='x' g='xs' aligns='center' {...otherProps}>
      <Avatar alt='user 4' size='lg' src={user.data?.image} />
      <Text content={user.data?.name ?? user.data?.email} size='xs' nowrap />
    </Block>
  )
}

User.displayName = 'User'

export default User
