import MarkupSpec from './MarkupSpec.component'


describe('[MarkupSpec] component', () => {
  it('should render component', () => {
    const container = render(<MarkupSpec />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
