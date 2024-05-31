// ---| tests |---
import { render } from 'tests'

// ---| self |---
import DashboardModalForm from './DashboardModalForm.component'

describe('[DashboardModalForm] component', () => {
  it('should render component', () => {
    const container = render(<DashboardModalForm />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
