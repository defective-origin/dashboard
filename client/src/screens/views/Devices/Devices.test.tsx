// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Devices from './Devices.component'
// import useDevices from './Devices.hook'
// import DevicesProvider, Devices from './Devices.context'

describe('[Devices] component', () => {
  it('should render component', () => {
    const container = render(<Devices />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Devices] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useDevices())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Devices] context', () => {
//   const wrapper = (props: DevicesProps) => <DevicesProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useDevices(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
