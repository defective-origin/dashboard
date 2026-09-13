import Skeleton from './Skeleton.component'


describe('[Skeleton] component', () => {
  it('should render component', () => {
    const container = render(<Skeleton />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
