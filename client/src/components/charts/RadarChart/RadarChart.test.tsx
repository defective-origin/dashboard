// ---| tests |---
import { render } from 'tests'

// ---| self |---
import RadarChart from './RadarChart.component'
// import useRadarChart from './RadarChart.hook'
// import RadarChartProvider, RadarChart from './RadarChart.context'

describe('[RadarChart] component', () => {
  it('should render component', () => {
    const container = render(<RadarChart />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[RadarChart] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useRadarChart())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[RadarChart] context', () => {
//   const wrapper = (props: RadarChartProps) => <RadarChartProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useRadarChart(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
