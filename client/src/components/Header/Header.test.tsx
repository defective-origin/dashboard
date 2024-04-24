// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Header from './Header.component'
// import useHeader from './Header.hook'
// import HeaderProvider, Header from './Header.context'

describe('[Header] component', () => {
  it('should render component', () => {
    const container = render(<Header />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Header] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useHeader())
// 
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Header] context', () => {
//   const wrapper = (props: HeaderProps) => <HeaderProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useHeader(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
