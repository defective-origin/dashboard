// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import SupportPage from './SupportPage.component'

describe('[SupportPage] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<SupportPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
