import SupportPage from './SupportPage.component'

describe('[SupportPage] component', () => {
  it('should render component', () => {
    const container = render(<SupportPage />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
