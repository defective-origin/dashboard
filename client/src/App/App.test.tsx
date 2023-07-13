// ---| tests |---
import { render } from 'tests'

// ---| self |---
import App from './App.component'

describe('[App] component', () => {
  it('should render component', () => {
    const container = render(<App />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
