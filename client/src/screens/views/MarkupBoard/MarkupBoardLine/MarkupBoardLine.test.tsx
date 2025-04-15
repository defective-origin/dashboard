// ---| tests |---
import { render } from 'tests'

// ---| self |---
import MarkupBoardLine from './MarkupBoardLine.component'
// import useMarkupBoardLine from './MarkupBoardLine.hooks'
// import MarkupBoardLineProvider, MarkupBoardLine from './MarkupBoardLine.context'

describe('[MarkupBoardLine] component', () => {
  it('should render component', () => {
    const container = render(<MarkupBoardLine />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[MarkupBoardLine] hooks', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupBoardLine())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[MarkupBoardLine] context', () => {
//   const wrapper = (props: MarkupBoardLineProps) => <MarkupBoardLineProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupBoardLine(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
