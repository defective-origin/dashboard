import TableRow from './TableRow.component'


describe('[TableRow] component', () => {
  it('should render component', () => {
    const container = render(<TableRow />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
