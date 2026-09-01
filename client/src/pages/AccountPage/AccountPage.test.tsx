// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import AccountPage from './AccountPage.component'

describe('[AccountPage] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<AccountPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
