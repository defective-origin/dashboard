// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Chart from './Chart.component'
// import useChart from './Chart.hook'
// import ChartProvider, Chart from './Chart.context'

describe('[Chart] component', () => {
  it('should render component', () => {
    const container = render(<Chart />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Chart] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useChart())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Chart] context', () => {
//   const wrapper = (props: ChartProps) => <ChartProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useChart(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
