import React from 'react'
import { Tooltip, IconButton, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material'

// ---| core |---
import { useAccountLauncher } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { Block } from 'components/Block'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppHeader.module.scss'

export type AppHeaderProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppHeader />
 */
export function AppHeader(props: AppHeaderProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppHeader, className)
  const account = useAccountLauncher()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Block className={_className} {...otherProps}>
      <Block.Start>{account.isAuthorized.toString()}</Block.Start>
      <Block.Center>{children}</Block.Center>
      <Block.End>
        <Tooltip title='Account menu'>
          <IconButton
            onClick={handleClick}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          {account.isAuthorized && (
            [
              <MenuItem key='profile'>Profile</MenuItem>,
              <Divider key='divider' />,
              <MenuItem key='logout' onClick={account.logout}>Logout</MenuItem>,
            ]
          )}
          {!account.isAuthorized && (
            [
              <MenuItem key='registration' onClick={account.login}>Sign in</MenuItem>,
              <MenuItem key='login' onClick={account.login}>Login</MenuItem>,
            ]
          )}
        </Menu>
      </Block.End>
    </Block>
  )
}

AppHeader.displayName = 'AppHeader'

export default AppHeader
