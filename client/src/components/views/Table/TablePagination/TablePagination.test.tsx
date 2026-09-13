import TablePagination from './TablePagination.component'


describe('[TablePagination] component', () => {
  it('should render component', () => {
    const container = render(<TablePagination />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
