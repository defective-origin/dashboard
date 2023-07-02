import React from 'react'
import { Popover, Avatar, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon from 'components/lib/Icon'

// ---| root |---

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './AppMenuScreen.module.scss'

export type AppMenuScreenProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <AppMenuScreen />
 */
export function AppMenuScreen(props: AppMenuScreenProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.AppMenuScreen, className)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div
      className={_className}
      {...otherProps}
    >
      <div>
        <Avatar onClick={handleClick}>
          <Icon type='account_circle' />
        </Avatar>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><Icon type='person' /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><Icon type='settings' /></ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><Icon type='account_circle' /></ListItemIcon>
                <ListItemText primary="Registration" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><Icon type='login' /></ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><Icon type='logout' /></ListItemIcon>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
      </div>

      {children}
    </div>
  )
}

AppMenuScreen.displayName = 'AppMenuScreen'

export default AppMenuScreen
