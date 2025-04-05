// ---| tests |---
import { render } from 'tests'

// ---| self |---
import WidgetModal from './WidgetModal.component'

describe('[WidgetModal] component', () => {
  it('should render component', () => {
    const container = render(<WidgetModal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
