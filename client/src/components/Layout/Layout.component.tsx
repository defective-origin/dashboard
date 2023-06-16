// ---| components |---
import { ComponentUIProps, useComponentUIProps } from 'components/Component'

// ---| self |---
import LayoutItem, { LayoutItemProps } from './LayoutItem'
import useLayoutUIProps, { LayoutUIProps } from './LayoutUI'

export type LayoutProps = LayoutUIProps & ComponentUIProps

export default function Layout(props: LayoutProps): JSX.Element | null {
  const _props = useLayoutUIProps(props)

  return useComponentUIProps(_props)
}


Layout.Item = LayoutItem
Layout.LeftAside = (props: LayoutItemProps) => <LayoutItem type="left-aside" {...props} />
Layout.RightAside = (props: LayoutItemProps) => <LayoutItem type="right-aside" {...props} />
Layout.Footer = (props: LayoutItemProps) => <LayoutItem type="footer" {...props} />
Layout.Header = (props: LayoutItemProps) => <LayoutItem type="header" {...props} />
Layout.Content = (props: LayoutItemProps) => <LayoutItem type="content" {...props} />
