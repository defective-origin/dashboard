// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Device from './Device.component'
// import useDevice from './Device.hook'
// import DeviceProvider, Device from './Device.context'

describe('[Device] component', () => {
  it('should render component', () => {
    const container = render(<Device />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Device] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useDevice())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Device] context', () => {
//   const wrapper = (props: DeviceProps) => <DeviceProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useDevice(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
