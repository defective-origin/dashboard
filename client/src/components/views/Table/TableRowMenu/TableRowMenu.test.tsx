import TableRowMenu from './TableRowMenu.component'


describe('[TableRowMenu] component', () => {
  it('should render component', () => {
    const container = render(<TableRowMenu />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
