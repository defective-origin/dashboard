// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Content from './Content.component'
// import useContent from './Content.hook'
// import ContentProvider, Content from './Content.context'

describe('[Content] component', () => {
  it('should render component', () => {
    const container = render(<Content />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Content] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useContent())
// 
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Content] context', () => {
//   const wrapper = (props: ContentProps) => <ContentProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useContent(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
