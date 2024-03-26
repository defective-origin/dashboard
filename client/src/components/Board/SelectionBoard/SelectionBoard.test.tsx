// ---| tests |---
import { render } from 'tests'

// ---| self |---
import SelectionBoard from './SelectionBoard.component'
// import useSelectionBoard from './SelectionBoard.hook'
// import SelectionBoardProvider, SelectionBoard from './SelectionBoard.context'

describe('[SelectionBoard] component', () => {
  it('should render component', () => {
    const container = render(<SelectionBoard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[SelectionBoard] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useSelectionBoard())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[SelectionBoard] context', () => {
//   const wrapper = (props: SelectionBoardProps) => <SelectionBoardProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useSelectionBoard(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
