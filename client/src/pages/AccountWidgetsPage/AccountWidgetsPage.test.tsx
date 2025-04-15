// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AccountWidgetsPage from './AccountWidgetsPage.component'
// import useAccountWidgetsPage from './AccountWidgetsPage.hooks'
// import AccountWidgetsPageProvider, AccountWidgetsPage from './AccountWidgetsPage.context'

describe('[AccountWidgetsPage] component', () => {
  it('should render component', () => {
    const container = render(<AccountWidgetsPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[AccountWidgetsPage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAccountWidgetsPage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[AccountWidgetsPage] context', () => {
//   const wrapper = (props: AccountWidgetsPageProps) => <AccountWidgetsPageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useAccountWidgetsPage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
