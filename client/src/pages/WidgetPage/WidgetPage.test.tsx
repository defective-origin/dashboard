// ---| tests |---
import { render } from 'tests'

// ---| self |---
import WidgetPage from './WidgetPage.component'

describe('[WidgetPage] component', () => {
  it('should render component', () => {
    const container = render(<WidgetPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
