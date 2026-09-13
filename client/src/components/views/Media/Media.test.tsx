import Media from './Media.component'


describe('[Media] component', () => {
  it('should render component', () => {
    const container = render(<Media />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
