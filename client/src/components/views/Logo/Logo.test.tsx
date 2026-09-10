import Logo from './Logo.component'

describe('[Logo] component', () => {
  it('should render component', () => {
    const container = render(<Logo />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
