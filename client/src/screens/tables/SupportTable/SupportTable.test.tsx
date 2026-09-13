import SupportTable from './SupportTable.component'


describe('[SupportTable] component', () => {
  it('should render component', () => {
    const container = render(<SupportTable />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
