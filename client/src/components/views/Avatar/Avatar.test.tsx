// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Avatar from './Avatar.component'
// import useAvatar from './Avatar.hooks'
// import AvatarProvider, Avatar from './Avatar.context'

describe('[Avatar] component', () => {
  it('should render component', () => {
    const container = render(<Avatar />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Avatar] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAvatar())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Avatar] context', () => {
//   const wrapper = (props: AvatarProps) => <AvatarProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useAvatar(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
