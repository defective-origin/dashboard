import React from 'react'
import { Popover, Avatar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton, Button } from '@mui/material'

// ---| core |---
import { useLocaleProvider, useUISettingsProvider, useUserProvider } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon from 'components/lib/Icon'
import Grid from 'components/lib/Grid'

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
  const ui = useUISettingsProvider()
  const locale = useLocaleProvider()
  const user = useUserProvider()

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <Grid className={_className} display='flex' direction='column' {...otherProps}>
      <Grid.Item className={css.TopActions} display='flex' direction='column'>
        <Avatar onClick={handleClick}>
          <Icon type='account_circle' fontSize='large' />
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
            {!user.isAuthorized && (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={user.login}>
                    <ListItemIcon><Icon type='account_circle' /></ListItemIcon>
                    <ListItemText primary="Registration" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={user.login}>
                    <ListItemIcon><Icon type='login' /></ListItemIcon>
                    <ListItemText primary="Sign In" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
            {user.isAuthorized && (
              <ListItem disablePadding>
                <ListItemButton onClick={user.logout}>
                  <ListItemIcon><Icon type='logout' /></ListItemIcon>
                  <ListItemText primary="Sign Out" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Popover>
      </Grid.Item>

      <Grid.Item className={css.MiddleActions} display='flex' direction='column'>
        <IconButton>
          <Icon className={css.ActiveButton} type='dashboard' fontSize='large'/>
        </IconButton>
        <IconButton>
          <Icon type='insert_chart' fontSize='large' />
        </IconButton>
      </Grid.Item>
      
      <Grid.Item className={css.BottomActions} display='flex' direction='column'>
        <IconButton>
          <Icon type='auto_stories' fontSize='large' />
        </IconButton>
        <IconButton>
          <Icon type='paid' fontSize='large' />
        </IconButton>
        <IconButton>
          <Icon type='keyboard' fontSize='large' />
        </IconButton>
        <IconButton>
          <Icon type='support_agent' fontSize='large' />
        </IconButton>
        <IconButton onClick={ui.toggleTheme}>
          <Icon type={`${ui.current.theme}_mode`} fontSize='large' />
        </IconButton>
        <Button>{locale.current}</Button>
        <IconButton onClick={ui.toggleMode}>
          <Icon
            type={ ui.isMode('edit') ? 'developer_mode_tv' : 'tv' }
            fontSize='large'
          />
        </IconButton>
      </Grid.Item>

      {children}
    </Grid>
  )
}

AppMenuScreen.displayName = 'AppMenuScreen'

export default AppMenuScreen
