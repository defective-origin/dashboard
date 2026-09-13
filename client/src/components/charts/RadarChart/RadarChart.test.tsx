import RadarChart from './RadarChart.component'


describe('[RadarChart] component', () => {
  it('should render component', () => {
    const container = render(<RadarChart />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
