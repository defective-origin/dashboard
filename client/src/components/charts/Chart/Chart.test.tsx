import Chart from './Chart.component'


describe('[Chart] component', () => {
  it('should render component', () => {
    const container = render(<Chart />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
