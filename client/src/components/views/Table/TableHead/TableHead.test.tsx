import TableHead from './TableHead.component'


describe('[TableHead] component', () => {
  it('should render component', () => {
    const container = render(<TableHead />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
