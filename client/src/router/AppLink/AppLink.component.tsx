import React from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import { ButtonStyleOptions, useButtonStyle } from 'components/actions/Button'
import { withPopup } from 'components/popups/Popup'

// ---| self |---
import css from './AppLink.module.scss'
import { useAppMatch } from '../router.hooks'
import { AppLinkOptions, AppLinkVariant, generateAppPath } from '../router.tools'


export type AppLinkProps<Name extends AppLinkVariant> = NavLinkProps & AppLinkOptions<Name> & ButtonStyleOptions

/**
 * Allows navigate inside application.
 * @example
 * <AppLink to='WIDGETS' />
 */
export const AppLink = withPopup(<Name extends AppLinkVariant>(props: AppLinkProps<Name>) => {
  const active = !!useAppMatch(props)
  const { to, params, search, className, ...otherProps } = useButtonStyle({
    end: props.target === '_blank' ? 'open_in_new' : undefined,
    ...props,
    active: active || props.active,
  })

  return (
    <NavLink
      className={cn(css.AppLink, className)}
      to={generateAppPath({ to, params, search })}
      {...otherProps}
    />
  )
})

AppLink.displayName = 'AppLink'

export default AppLink
