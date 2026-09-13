import Label from './Label.component'


describe('[Label] component', () => {
  it('should render component', () => {
    const container = render(<Label />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
