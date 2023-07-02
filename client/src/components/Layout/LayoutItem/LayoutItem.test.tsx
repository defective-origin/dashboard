// ---| tests |---
import { render } from 'tests'

// ---| self |---
import LayoutItem from './LayoutItem.component'

describe('[LayoutItem] component', () => {
  it('should render component', () => {
    const container = render(<LayoutItem />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
