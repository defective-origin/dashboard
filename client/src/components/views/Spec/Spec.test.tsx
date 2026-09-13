import Spec from './Spec.component'


describe('[Spec] component', () => {
  it('should render component', () => {
    const container = render(<Spec name='User' content='Looser' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
