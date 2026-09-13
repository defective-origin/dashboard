import Action from './Action.component'


describe('[Action] component', () => {
  it('should render component', () => {
    const container = render(<Action />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
