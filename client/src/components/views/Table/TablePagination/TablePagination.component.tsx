import React, { useEffect, useLayoutEffect, useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Label from 'components/views/Label'
import { Text } from 'components/views/Text'
import Block from 'components/layouts/Block'
import Button from 'components/actions/Button'
import Divider from 'components/layouts/Divider'
import { SelectField } from 'components/forms/fields/SelectField'

// ---| self |---
import css from './TablePagination.module.scss'

const DEFAULT_OPTIONS = [10, 25, 50, 100]

export type RowsPerPageOptions = number[]

export type TablePaginationProps = {
  items?: any[]
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  visible?: boolean
  className?: string
  onChange?: (items: any[]) => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <TablePagination />
 */
export function TablePagination(props: TablePaginationProps) {
  const { rowsPerPageOptions = DEFAULT_OPTIONS, rowsPerPage = rowsPerPageOptions[1], items, visible, onChange, className, ...otherProps } = props
  const _className = cn(css.TablePagination, className)
  const [page, setPage] = React.useState(0)
  const [currentRowsPerPage, setCurrentRowsPerPage] = React.useState(rowsPerPage)
  const count = items?.length ?? 0
  const pages = Math.ceil(count / rowsPerPage)
  const hasNext = page < pages - 1
  const hasPrev = page > 0

  const updateItems = useFunc(() => {
    const rows = visible ? rowsPerPage : items?.length ?? 0
    const start = page * rows
    const end = start + rows

    onChange?.(items?.slice(start, end) ?? [])
  })

  const onPageChange = useFunc((newPage: number) => {
    setPage(newPage)
    updateItems()
  })

  const onRowsPerPageChange = useFunc((value: number) => {
    setCurrentRowsPerPage(value)
    onPageChange(0)
  })

  useEffect(() => updateItems(), [updateItems, items])

  const rowsOptions = useMemo(() => rowsPerPageOptions.map(num => ({ value: num, children: num })), [rowsPerPageOptions])

  if (!visible) {
    return null
  }

  return (
    <Block className={_className} v='x' justifies='space-between' aligns='center' {...otherProps}>
      <Label
        className={css.TablePaginationLabel}
        icon='file_copy'
        content={pages}
        tooltip={t('LABEL.PAGES')}
      />
      <Divider v='y' />

      <Block v='x' justifies='space-between' aligns='center'>
        <Button className={css.TablePaginationAction} start='first_page' disabled={!hasPrev} onClick={() => hasPrev && onPageChange(0)} />
        <Button className={css.TablePaginationAction} start='chevron_left' disabled={!hasPrev} onClick={() => hasPrev && onPageChange(page - 1)} />
        <Text content={page + 1} size='xxs' />
        <Button className={css.TablePaginationAction} start='chevron_right' disabled={!hasNext} onClick={() => hasNext && onPageChange(page + 1)} />
        <Button className={css.TablePaginationAction} start='last_page' disabled={!hasNext} onClick={() => hasNext && onPageChange(pages)} />
      </Block>

      <Divider v='y' />
      <Label
        icon='table_rows'
        tooltip={t('LABEL.ROWS_PER_PAGE')}
        className={css.TablePaginationLabel}
      >
        <SelectField
          className={css.TablePaginationSelect}
          value={currentRowsPerPage}
          items={rowsOptions}
          onChange={onRowsPerPageChange}
        />
      </Label>
    </Block>
  )
}

TablePagination.displayName = 'TablePagination'

export default TablePagination
