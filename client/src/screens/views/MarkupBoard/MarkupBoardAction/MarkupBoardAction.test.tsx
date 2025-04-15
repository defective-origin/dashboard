// ---| tests |---
import { render } from 'tests'

// ---| self |---
import MarkupBoardAction from './MarkupBoardAction.component'
// import useMarkupBoardAction from './MarkupBoardAction.hooks'
// import MarkupBoardActionProvider, MarkupBoardAction from './MarkupBoardAction.context'

describe('[MarkupBoardAction] component', () => {
  it('should render component', () => {
    const container = render(<MarkupBoardAction />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[MarkupBoardAction] hooks', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupBoardAction())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[MarkupBoardAction] context', () => {
//   const wrapper = (props: MarkupBoardActionProps) => <MarkupBoardActionProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupBoardAction(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
