import MarkupMenu from './MarkupMenu.component'


describe('[MarkupMenu] component', () => {
  it('should render component', () => {
    const container = render(<MarkupMenu />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
