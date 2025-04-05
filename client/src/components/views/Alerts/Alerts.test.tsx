// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Alerts from './Alerts.component'
// import useAlerts from './Alerts.hook'
// import AlertsProvider, Alerts from './Alerts.context'

describe('[Alerts] component', () => {
  it('should render component', () => {
    const container = render(<Alerts />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Alerts] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAlerts())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Alerts] context', () => {
//   const wrapper = (props: AlertsProps) => <AlertsProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useAlerts(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
