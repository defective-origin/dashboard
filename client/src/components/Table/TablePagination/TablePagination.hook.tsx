import React, { useCallback, useLayoutEffect } from 'react'

const DEFAULT_OPTIONS = [10, 25, 100]

export type RowsPerPageOptions = Array<number | { value: number; label: string }>

export type TablePaginationOptions = {
  count?: number
  page?: number
  rowsPerPageOptions?: RowsPerPageOptions
}

export type TablePaginationReturnOptions = {
  count: number
  page: number
  rowsPerPage: number
  rowsPerPageOptions: RowsPerPageOptions
  onPageChange: (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, page: number) => void
  onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export function useTablePagination(options: TablePaginationOptions): TablePaginationReturnOptions {
  const {
    page = 0,
    count = 0,
    rowsPerPageOptions = DEFAULT_OPTIONS,
  } = options
  const [currentPage, setPage] = React.useState(page)
  const [currentRowsPerPage, setCurrentRowsPerPage] = React.useState(
    typeof rowsPerPageOptions[0] === 'number'
      ? rowsPerPageOptions[0]
      : rowsPerPageOptions[0].value,
  )

  const onPageChange = useCallback((_: unknown, newPage: number) => setPage(newPage), [])

  const onRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRowsPerPage(+event.target.value)
    setPage(0)
  }, [])

  useLayoutEffect(() => setPage(page), [page, count, rowsPerPageOptions])

  return {
    count,
    page: currentPage,
    rowsPerPage: currentRowsPerPage,
    rowsPerPageOptions,
    onPageChange,
    onRowsPerPageChange,
  }
}

export default useTablePagination
