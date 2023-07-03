import React from 'react'
import { Popover, Avatar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, IconButton } from '@mui/material'
import Block from 'components/Block'

// ---| core |---
import { useLocaleProvider, useUISettingsProvider, useUserProvider } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon from 'components/lib/Icon'
import Button from 'components/lib/Button'

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
    <Block className={_className} type='column-center' {...otherProps}>
      <Block.Start className={css.TopActions}>
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
      </Block.Start>

      <Block.Center className={css.MiddleActions}>
        <Button className={css.SquareButton} icon='dashboard' size='large' />
        <Button className={css.SquareButton} icon='insert_chart' size='large' />
      </Block.Center>
      
      <Block.End className={css.BottomActions}>
        <Button className={`${css.SquareButton} ${css.ActiveButton}`} icon='auto_stories' size='large' />
        <Button className={css.SquareButton} icon='paid' size='large' />
        <Button className={css.SquareButton} icon='keyboard' size='large' />
        <Button className={css.SquareButton} icon='support_agent' size='large' />
        <Button className={css.SquareButton} icon={`${ui.current.theme}_mode`} size='large' onClick={ui.toggleTheme} />
        <Button className={css.SquareButton} size='small' text={locale.current} />
        <Button className={css.SquareButton} icon={ui.isMode('edit') ? 'developer_mode_tv' : 'tv'} size='large' onClick={ui.toggleMode} />
      </Block.End>

      {children}
    </Block>
  )
}

AppMenuScreen.displayName = 'AppMenuScreen'

export default AppMenuScreen
