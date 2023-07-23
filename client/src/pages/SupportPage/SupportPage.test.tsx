// ---| tests |---
import { render } from 'tests'

// ---| self |---
import SupportPage from './SupportPage.component'

describe('[SupportPage] component', () => {
  it('should render component', () => {
    const container = render(<SupportPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
