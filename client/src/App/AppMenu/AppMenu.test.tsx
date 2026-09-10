import AppMenu from './AppMenu.component'

describe('[AppMenu] component', () => {
  it('should render component', () => {
    const container = render(<AppMenu />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
