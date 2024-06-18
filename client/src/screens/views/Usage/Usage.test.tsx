// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Usage from './Usage.component'
// import useUsage from './Usage.hook'
// import UsageProvider, Usage from './Usage.context'

describe('[Usage] component', () => {
  it('should render component', () => {
    const container = render(<Usage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Usage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useUsage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Usage] context', () => {
//   const wrapper = (props: UsageProps) => <UsageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useUsage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
