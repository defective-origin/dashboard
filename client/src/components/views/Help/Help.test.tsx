// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Help from './Help.component'
// import useHelp from './Help.hook'
// import HelpProvider, Help from './Help.context'

describe('[Help] component', () => {
  it('should render component', () => {
    const container = render(<Help />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Help] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useHelp())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Help] context', () => {
//   const wrapper = (props: HelpProps) => <HelpProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useHelp(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
