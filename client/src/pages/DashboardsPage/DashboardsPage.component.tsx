import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { useDashboards } from 'api'

// ---| pages |---
// ---| screens |---
import BasePage, { BasePageProps } from 'screens/BasePage'

// ---| components |---
import NavLink from 'components/NavLink'
import Layout from 'components/Layout'
import Item from 'components/Item'

// ---| self |---
import css from './DashboardsPage.module.scss'

export type DashboardsPageProps = BasePageProps

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardsPage />
 */
export function DashboardsPage(props: DashboardsPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DashboardsPage, className)
  const response = useDashboards()

  return (
    <BasePage className={_className} name='PAGES.DASHBOARDS' scroll='y' noFooter {...otherProps}>
      <Layout g='xxs' columns={3} stretch>
        {response.items.map((board) => (
          <NavLink key={board.id} to='BOARD' params={{ id: board.id!.toString() }} clear>
            <Item height={300} width='100%' border='var(--border)' />
          </NavLink>
        ))}
      </Layout>

      {children}
    </BasePage>
  )
}

DashboardsPage.displayName = 'DashboardsPage'

export default DashboardsPage
