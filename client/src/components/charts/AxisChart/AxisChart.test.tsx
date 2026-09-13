import AxisChart from './AxisChart.component'


describe('[AxisChart] component', () => {
  it('should render component', () => {
    const container = render(<AxisChart />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
