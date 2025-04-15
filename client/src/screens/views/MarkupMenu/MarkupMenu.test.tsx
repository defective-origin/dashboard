// ---| tests |---
import { render } from 'tests'

// ---| self |---
import MarkupMenu from './MarkupMenu.component'
// import useMarkupMenu from './MarkupMenu.hooks'
// import MarkupMenuProvider, MarkupMenu from './MarkupMenu.context'

describe('[MarkupMenu] component', () => {
  it('should render component', () => {
    const container = render(<MarkupMenu />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[MarkupMenu] hooks', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupMenu())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[MarkupMenu] context', () => {
//   const wrapper = (props: MarkupMenuProps) => <MarkupMenuProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkupMenu(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
