import FeatureTable from './FeatureTable.component'


describe('[FeatureTable] component', () => {
  it('should render component', () => {
    const container = render(<FeatureTable />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
