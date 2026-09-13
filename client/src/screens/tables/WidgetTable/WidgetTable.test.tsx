import WidgetTable from './WidgetTable.component'


describe('[WidgetTable] component', () => {
  it('should render component', () => {
    const container = render(<WidgetTable />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
