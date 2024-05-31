// ---| tests |---
import { render } from 'tests'

// ---| self |---
import WidgetModalForm from './WidgetModalForm.component'

describe('[WidgetModalForm] component', () => {
  it('should render component', () => {
    const container = render(<WidgetModalForm />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
