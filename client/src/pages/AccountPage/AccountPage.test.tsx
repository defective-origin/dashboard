// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AccountPage from './AccountPage.component'

describe('[AccountPage] component', () => {
  it('should render component', () => {
    const container = render(<AccountPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
