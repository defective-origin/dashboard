import React, { useCallback, useState } from 'react'

// ---| components |---
import Input from 'components/Input'
import Button from 'components/Button'
import Icon from 'components/Icon'
import Box, { BoxProps } from 'components/Box'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './TableMenu.module.scss'

export type TableMenuProps = BoxProps & {
  page?: number
  pageSize?: number
  total?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  onFilterChange?: (filters: Record<string, unknown>) => void
}

export default function TableMenu(props: TableMenuProps): JSX.Element | null {
  const { page = 0, pageSize = 10, total = 0, onPageChange, onPageSizeChange, className, ...otherProps } = props
  const [currPage, setCurrPage] = useState(page.toString())
  const [currPageSize, setCurrPageSize] = useState(pageSize.toString())
  const startRecords = page * pageSize
  const endRecords = startRecords + pageSize > total ? total : startRecords + pageSize
  const report = `${page * pageSize} - ${endRecords} | ${total}`

  const changePage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const isValidValue = !Number.isNaN(Number(value))

    if (isValidValue) {
      if (onPageChange) {
        onPageChange(Number(value))
      }

      setCurrPage(value)
    }
  }, [onPageChange])

  const changePageSize = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (onPageSizeChange) {
      onPageSizeChange(Number(value))
    }

    setCurrPageSize(value)
  }, [onPageSizeChange])

  return (
    <Box className={cn(css.Menu, className)} {...otherProps}>
      <Box className={css.LeftPanel}>
        <Input
          className={css.PageSize}
          prefix={<Icon type="table_rows" size='xs' />}
          placeholder="Page"
          value={currPageSize}
          onChange={changePageSize}
        />

        <Input
          className={css.Page}
          prefix={<Icon type="auto_stories" size='xs' />}
          placeholder="Page"
          value={currPage}
          onChange={changePage}
        />

        <Input
          className={css.Report}
          prefix={<Icon type="database" size='xs' />}
          placeholder="Report"
          value={report}
        />
      </Box>

      <Input className={css.Search} suffix={<Icon type="search" size='xs' />} placeholder="Search" />

      <Box className={css.RightPanel}>
        <Button icon="sort" size='xs' type="text" />
        <Button icon="view_column" size='xs' type="text" />
        <Button icon="filter_list" size='xs' type="text" />
        <Button icon="refresh" size='xs' type="text" />
        <Button icon="download" size='xs' type="text" />
      </Box>
    </Box>
  )
}
