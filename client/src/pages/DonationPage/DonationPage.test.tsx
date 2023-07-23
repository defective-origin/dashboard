// ---| tests |---
import { render } from 'tests'

// ---| self |---
import DonationPage from './DonationPage.component'

describe('[DonationPage] component', () => {
  it('should render component', () => {
    const container = render(<DonationPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
