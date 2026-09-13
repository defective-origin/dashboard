import Help from './Help.component'


describe('[Help] component', () => {
  it('should render component', () => {
    const container = render(<Help />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
