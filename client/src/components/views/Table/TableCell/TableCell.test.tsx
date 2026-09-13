import TableCell from './TableCell.component'


describe('[TableCell] component', () => {
  it('should render component', () => {
    const container = render(<TableCell column={{}} />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
