import { useCallback, useState } from 'react'

export type Records = {
  total: number
  start: number
  end: number
}

export type Page = {
  records: number
  prev: number
  current: number
  next: number
  first: number
  last: number
}

export type PaginationOptions = {
  total?: number
  records?: number
}

export type PaginationReturnOptions = {
  hasPages: boolean
  page: Page
  records: Records
  selectPrevPage: () => void
  selectNextPage: () => void
  selectFirstPage: () => void
  selectLastPage: () => void
  selectPage: (page: number) => void
}

export default function usePagination(options: PaginationOptions): PaginationReturnOptions {
  const { total = 0, records = 10 } = options
  const first = total && 1
  const [current, setCurrent] = useState(first)
  const last = Math.ceil(total / records)
  const prev = Math.max(first, current - 1)
  const next = Math.min(last, current + 1)
  const start = first * records
  const end = last * records - 1
  const initPage = useCallback((page: number) => Math.max(first, Math.min(last, page)), [first, last])
  const selectPage = useCallback((page: number) => setCurrent(initPage(page)), [initPage])
  const selectPrevPage = useCallback(() => selectPage(prev), [prev, selectPage])
  const selectNextPage = useCallback(() => selectPage(next), [next, selectPage])
  const selectFirstPage = useCallback(() => selectPage(first), [first, selectPage])
  const selectLastPage = useCallback(() => selectPage(last), [last, selectPage])

  return {
    hasPages: !!last,
    records: {
      total,
      start,
      end,
    },
    page: {
      records,
      prev,
      next,
      current,
      first,
      last,
    },
    selectPrevPage,
    selectNextPage,
    selectFirstPage,
    selectLastPage,
    selectPage,
  }
}
