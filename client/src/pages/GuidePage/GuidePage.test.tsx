import GuidePage from './GuidePage.component'

describe('[GuidePage] component', () => {
  it('should render component', () => {
    const container = render(<GuidePage />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
