// ---| tests |---
import { render } from 'tests'

// ---| self |---
import MarkupSpec from './MarkupSpec.component'
// import useMarkupSpec from './MarkupSpec.hooks'
// import MarkupSpecProvider, MarkupSpec from './MarkupSpec.context'

describe('[MarkupSpec] component', () => {
  it('should render component', () => {
    const container = render(<MarkupSpec />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[MarkupSpec] hooks', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupSpec())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[MarkupSpec] context', () => {
//   const wrapper = (props: MarkupSpecProps) => <MarkupSpecProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupSpec(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
