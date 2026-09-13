import AppContent from './AppContent.component'


describe('[AppContent] component', () => {
  it('should render component', () => {
    const container = render(<AppContent />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
