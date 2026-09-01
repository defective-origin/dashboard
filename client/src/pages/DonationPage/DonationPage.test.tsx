// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import DonationPage from './DonationPage.component'

describe('[DonationPage] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<DonationPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
