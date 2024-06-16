// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Account from './Account.component'
// import useAccount from './Account.hook'
// import AccountProvider, Account from './Account.context'

describe('[Account] component', () => {
  it('should render component', () => {
    const container = render(<Account />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Account] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAccount())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Account] context', () => {
//   const wrapper = (props: AccountProps) => <AccountProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useAccount(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
