import TableBody from './TableBody.component'


describe('[TableBody] component', () => {
  it('should render component', () => {
    const container = render(<TableBody />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
