// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Footer from './Footer.component'
// import useFooter from './Footer.hook'
// import FooterProvider, Footer from './Footer.context'

describe('[Footer] component', () => {
  it('should render component', () => {
    const container = render(<Footer />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Footer] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useFooter())
// 
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Footer] context', () => {
//   const wrapper = (props: FooterProps) => <FooterProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useFooter(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
