import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { Board, useBoards } from 'api'

// ---| pages |---
import SelectPage, { SelectPageProps } from 'pages/SearchPage'

// ---| screens |---
// ---| components |---
// ---| self |---
import css from './DashboardsPage.module.scss'

export type DashboardsPageProps = Partial<SelectPageProps<Board>>

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardsPage />
 */
export function DashboardsPage(props: DashboardsPageProps) {
  const { className } = props
  const _className = cn(css.DashboardsPage, className)
  const boards = useBoards()

  // TODO: add devices to preview card

  return (
    <SelectPage
      className={_className}
      name='LABEL.DASHBOARDS'
      to='BOARD'
      menu={[
        { start: 'add', tooltip: t('ACTION.ADD_BOARD') },
      ]}
      items={boards.data}
    />
  )
}

DashboardsPage.displayName = 'DashboardsPage'

export default DashboardsPage
