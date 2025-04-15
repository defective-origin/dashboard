// ---| tests |---
import { render } from 'tests'

// ---| self |---
import MarkupsView from './MarkupsView.component'
// import useMarkupsView from './MarkupsView.hooks'
// import MarkupsViewProvider, MarkupsView from './MarkupsView.context'

describe('[MarkupsView] component', () => {
  it('should render component', () => {
    const container = render(<MarkupsView />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[MarkupsView] hooks', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupsView())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[MarkupsView] context', () => {
//   const wrapper = (props: MarkupsViewProps) => <MarkupsViewProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupsView(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
