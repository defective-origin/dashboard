// ---| tests |---
import { render } from 'tests'

// ---| self |---
import DashboardModal from './DashboardModal.component'

describe('[DashboardModal] component', () => {
  it('should render component', () => {
    const container = render(<DashboardModal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
