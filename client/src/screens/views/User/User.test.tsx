// ---| tests |---
import { render } from 'tests'

// ---| self |---
import User from './User.component'
// import useUser from './User.hook'
// import UserProvider, User from './User.context'

describe('[User] component', () => {
  it('should render component', () => {
    const container = render(<User />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[User] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useUser())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[User] context', () => {
//   const wrapper = (props: UserProps) => <UserProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useUser(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
