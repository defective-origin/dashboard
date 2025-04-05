// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Tag from './Tag.component'
// import useTag from './Tag.hook'
// import TagProvider, Tag from './Tag.context'

describe('[Tag] component', () => {
  it('should render component', () => {
    const container = render(<Tag />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Tag] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTag())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Tag] context', () => {
//   const wrapper = (props: TagProps) => <TagProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTag(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
