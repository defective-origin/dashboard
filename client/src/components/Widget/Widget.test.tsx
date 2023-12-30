// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Widget from './Widget.component'
// import useWidget from './Widget.hook'
// import WidgetProvider, Widget from './Widget.context'

describe('[Widget] component', () => {
  it('should render component', () => {
    const container = render(<Widget />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Widget] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidget())
// 
//     expect(result.current).toBe(null)
//   })
// })

// describe('[Widget] context', () => {
//   const wrapper = (props: WidgetProps) => <WidgetProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidget(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
