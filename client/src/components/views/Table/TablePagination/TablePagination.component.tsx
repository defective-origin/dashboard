import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'

// ---| components |---
import Label from 'components/views/Label'
import { Text } from 'components/views/Text'
import Block from 'components/layouts/Block'
import Button from 'components/actions/Button'
import Divider from 'components/layouts/Divider'
import { SelectField } from 'components/forms/fields/SelectField'

// ---| self |---
import css from './TablePagination.module.scss'



export type TablePaginationPageOptions = {
  page: number
  rows: number
}
export const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100]
export const DEFAULT_PAGINATION_OPTIONS: TablePaginationPageOptions = {
  page: 0,
  rows: ROWS_PER_PAGE_OPTIONS[1],
}

export type RowsPerPageOptions = number[]
export type TablePaginationProps = TablePaginationPageOptions & {
  records?: number
  visible?: boolean
  className?: string
  onChange?: (options: TablePaginationPageOptions) => void
}

/**
 * Component description.
 * @example
 * <TablePagination />
 */
export function TablePagination(props: TablePaginationProps) {
  const { page, rows, records = 0, visible, onChange, className, ...otherProps } = props
  const pages = Math.ceil(records / rows)
  const hasNext = page < pages - 1
  const hasPrev = page > 0

  const change = (options: Partial<TablePaginationPageOptions>) => onChange?.({ page, rows, ...options })

  if (!visible) {
    return null
  }

  return (
    <Block className={cn(css.TablePagination, className)} v='x' justifies='space-between' aligns='center' {...otherProps}>
      <Label
        className={css.TablePaginationLabel}
        icon='file_copy'
        content={pages}
        tooltip={t('LABEL.PAGES')}
      />
      <Divider v='y' />

      <Block v='x' justifies='space-between' aligns='center' p='0 xxs'>
        <Button className={css.TablePaginationAction} start='first_page' disabled={!hasPrev} onClick={() => change({ page: 0 })} />
        <Button className={css.TablePaginationAction} start='chevron_left' disabled={!hasPrev} onClick={() => change({ page: page - 1 })} />
        <Text content={page + 1} size='xxs' />
        <Button className={css.TablePaginationAction} start='chevron_right' disabled={!hasNext} onClick={() => change({ page: page + 1 })} />
        <Button className={css.TablePaginationAction} start='last_page' disabled={!hasNext} onClick={() => change({ page: pages - 1 })} />
      </Block>

      <Divider v='y' />
      <Label
        icon='table_rows'
        tooltip={t('LABEL.ROWS_PER_PAGE')}
        className={css.TablePaginationLabel}
      >
        <SelectField className={css.TablePaginationSelect} value={rows} onChange={rows => change({ rows, page: 0 })}>
          {ROWS_PER_PAGE_OPTIONS.map(num => <SelectField.Item key={num} value={num} children={num} />)}
        </SelectField>
      </Label>
    </Block>
  )
}

TablePagination.displayName = 'TablePagination'

export default TablePagination
