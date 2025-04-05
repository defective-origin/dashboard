// ---| tests |---
import { render } from 'tests'

// ---| self |---
import WidgetViewModal from './WidgetViewModal.component'

describe('[WidgetViewModal] component', () => {
  it('should render component', () => {
    const container = render(<WidgetViewModal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
