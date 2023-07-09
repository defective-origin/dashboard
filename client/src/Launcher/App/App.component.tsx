import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout from 'components/Layout'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './App.module.scss'

export type AppProps = {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <App />
 */
export function App(props: AppProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.App, className)

  return (
    <Layout className={_className} type='column' {...otherProps}>
      <Layout.LeftAside className={css.Menu}></Layout.LeftAside>
      <Layout.Header className={css.Alert}></Layout.Header>
      <Layout.RightAside className={css.Drawer}></Layout.RightAside>
      <Layout.Footer className={css.Guard}></Layout.Footer>

      <Layout.Content>
        <Layout className={css.Layout} type='column'>
          <Layout.LeftAside className={css.LeftAside} scroll='y'></Layout.LeftAside>
          <Layout.Header className={css.Header}></Layout.Header>
          <Layout.RightAside className={css.RightAside} scroll='y'></Layout.RightAside>
          <Layout.Footer className={css.Footer}></Layout.Footer>

          <Layout.Content className={css.Content} scroll='y'>
            {children}
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

App.displayName = 'App'

export default App
