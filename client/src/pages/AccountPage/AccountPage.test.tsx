import AccountPage from './AccountPage.component'

describe('[AccountPage] component', () => {
  it('should render component', () => {
    const container = render(<AccountPage />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
