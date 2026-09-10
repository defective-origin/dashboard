import WidgetPage from './WidgetPage.component'

describe('[WidgetPage] component', () => {
  it('should render component', () => {
    const container = render(<WidgetPage />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
