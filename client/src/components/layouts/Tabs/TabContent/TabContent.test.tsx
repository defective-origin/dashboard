import TabContent from './TabContent.component'


describe('[TabContent] component', () => {
  it('should render component', () => {
    const container = render(<TabContent />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
