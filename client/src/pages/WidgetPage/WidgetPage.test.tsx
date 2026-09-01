// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import WidgetPage from './WidgetPage.component'

describe('[WidgetPage] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<WidgetPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
