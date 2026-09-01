// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import App from './App.component'

describe('[App] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<App />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
