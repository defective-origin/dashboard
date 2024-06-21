// ---| tests |---
import { render } from 'tests'

// ---| self |---
import DonationTable from './DonationTable.component'
// import useDonationTable from './DonationTable.hook'
// import DonationTableProvider, DonationTable from './DonationTable.context'

describe('[DonationTable] component', () => {
  it('should render component', () => {
    const container = render(<DonationTable />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[DonationTable] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useDonationTable())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[DonationTable] context', () => {
//   const wrapper = (props: DonationTableProps) => <DonationTableProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useDonationTable(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
