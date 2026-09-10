import App from './App.component'

describe('[App] component', () => {
  it('should render component', () => {
    const container = render(<App />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
