import React from 'react'

// ---| components |---
import Layout from 'components/Layout'
import Box, { BoxProps } from 'components/Box'

// ---| common |---
import { cn,  rn } from 'common/tools'

// ---| self |---
import css from './Drawer.module.scss'
import { DrawerContextProvider, useDrawerContext } from './Drawer.context'
import DrawerItem, { DrawerItemProps } from './DrawerItem'


export type DrawerProps = BoxProps & {
  positioned?: boolean
  onClose?: () => void
}

function Drawer(props: DrawerProps): JSX.Element {
  const { positioned, onClose, className, children, ...otherProps } = props
  const contentType = [DrawerWithContext.Content]
  const asidesType = [DrawerWithContext.LeftAside,  DrawerWithContext.RightAside, DrawerWithContext.Header, DrawerWithContext.Footer]
  const content = rn.getChildByType(children, contentType)
  const asides = rn.getChildrenByType(children, asidesType)
  const drawerContext = useDrawerContext()

  //  FIXME: onCLose does'not work
  return (
    <Box className={cn(css.Drawer, className)} position="relative" {...otherProps}>
      <Layout onClick={onClose}
        className={cn({ [css.Visible]: positioned && !!drawerContext?.count })}
        position={positioned ? 'absolute' : 'static'}
        stretch="xy"
      >
        {!positioned && content}
        {asides}
      </Layout>

      {positioned && content}
    </Box>
  )
}

export default function DrawerWithContext(props: DrawerProps): JSX.Element {
  return (
    <DrawerContextProvider>
      <Drawer {...props}>
        {props.children}
      </Drawer>
    </DrawerContextProvider>
  )
}

DrawerWithContext.Item = DrawerItem
DrawerWithContext.Content = (props: DrawerItemProps) => <DrawerItem {...props} type="content" />
DrawerWithContext.LeftAside = (props: DrawerItemProps) => <DrawerItem {...props} type="left-aside" />
DrawerWithContext.RightAside = (props: DrawerItemProps) => <DrawerItem {...props} type="right-aside" />
DrawerWithContext.Header = (props: DrawerItemProps) => <DrawerItem {...props} type="header" />
DrawerWithContext.Footer = (props: DrawerItemProps) => <DrawerItem {...props} type="footer" />
