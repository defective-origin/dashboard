// ---| tests |---
import { render } from 'tests'

// ---| self |---
import ExpensesTable from './ExpensesTable.component'
// import useExpensesTable from './ExpensesTable.hooks'
// import ExpensesTableProvider, ExpensesTable from './ExpensesTable.context'

describe('[ExpensesTable] component', () => {
  it('should render component', () => {
    const container = render(<ExpensesTable />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[ExpensesTable] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useExpensesTable())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[ExpensesTable] context', () => {
//   const wrapper = (props: ExpensesTableProps) => <ExpensesTableProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useExpensesTable(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
