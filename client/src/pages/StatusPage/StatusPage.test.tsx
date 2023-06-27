// ---| tests |---
import { render } from 'tests'

// ---| self |---
import StatusPage from './StatusPage.component'

describe('[StatusPage] component', () => {
  it('should render component', () => {
    const container = render(<StatusPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
