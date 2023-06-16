import { useMemo } from 'react'

// ---| components |---
import Flex, { FlexProps } from 'components/Flex'
import Button from 'components/Button'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |---
import css from './Pagination.module.scss'
import usePagination, { PaginationOptions } from './Pagination.hook'

export type PaginationProps = FlexProps & PaginationOptions

// TODO: add seeing other  pages  via onWheel event
export default function Pagination(props: PaginationProps): JSX.Element {
  const { direction ,total, records, className, ...otherProps } = props
  const paginator = usePagination({ total, records })
  const _className = cn(css.Pagination, className)
  const totalButtons = 0
  const pageButtonsCount = (totalButtons - 2) / 2
  const pageButtons = useMemo(() =>
    _.range(
      Math.max(paginator.page.current - pageButtonsCount, paginator.page.first),
      Math.min(paginator.page.current + pageButtonsCount, paginator.page.last),
    ).map((page) => (
      <Button
        key={page}
        className={cn(css.PaginationButton, { [css.PaginationActiveButton]: paginator.page.current === page })}
        text={page}
        onClick={() => paginator.selectPage(page)}
      />
    ))
  , [paginator.page.current])

  return (
    <Flex className={_className} direction={direction} {...otherProps}>
      <Button
        className={css.PaginationButton}
        disable={!paginator.hasPages || paginator.page.current - pageButtonsCount <= paginator.page.first}
        icon={direction === 'x' ? 'keyboard_arrow_left' : 'keyboard_arrow_up'}
        onClick={paginator.selectFirstPage}
      />

      {pageButtons}

      <Button
        className={css.PaginationButton}
        disable={!paginator.hasPages || paginator.page.current + pageButtonsCount >= paginator.page.last}
        icon={direction === 'x' ? 'keyboard_arrow_right' : 'keyboard_arrow_down'}
        onClick={paginator.selectLastPage}
      />
    </Flex>
  )
}
