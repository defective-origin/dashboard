// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AxisChart from './AxisChart.component'
// import useAxisChart from './AxisChart.hooks'
// import AxisChartProvider, AxisChart from './AxisChart.context'

describe('[AxisChart] component', () => {
  it('should render component', () => {
    const container = render(<AxisChart />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[AxisChart] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAxisChart())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[AxisChart] context', () => {
//   const wrapper = (props: AxisChartProps) => <AxisChartProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useAxisChart(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
