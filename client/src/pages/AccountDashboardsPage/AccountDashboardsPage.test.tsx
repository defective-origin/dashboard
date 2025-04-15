// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AccountDashboardsPage from './AccountDashboardsPage.component'
// import useAccountDashboardsPage from './AccountDashboardsPage.hooks'
// import AccountDashboardsPageProvider, AccountDashboardsPage from './AccountDashboardsPage.context'

describe('[AccountDashboardsPage] component', () => {
  it('should render component', () => {
    const container = render(<AccountDashboardsPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[AccountDashboardsPage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAccountDashboardsPage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[AccountDashboardsPage] context', () => {
//   const wrapper = (props: AccountDashboardsPageProps) => <AccountDashboardsPageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useAccountDashboardsPage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
