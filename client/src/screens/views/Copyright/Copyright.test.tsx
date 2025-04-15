// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Copyright from './Copyright.component'
// import useCopyright from './Copyright.hooks'
// import CopyrightProvider, Copyright from './Copyright.context'

describe('[Copyright] component', () => {
  it('should render component', () => {
    const container = render(<Copyright />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Copyright] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useCopyright())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Copyright] context', () => {
//   const wrapper = (props: CopyrightProps) => <CopyrightProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useCopyright(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
