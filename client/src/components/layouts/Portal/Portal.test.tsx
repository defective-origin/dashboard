import Portal from './Portal.component'


describe('[Portal] component', () => {
  it('should render component', () => {
    const container = render(<Portal name='page-name' content={<div>Content</div>} />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
