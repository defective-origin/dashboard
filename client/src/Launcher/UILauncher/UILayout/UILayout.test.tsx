// ---| tests |---
import { render } from 'tests'

// ---| self |---
import UILayout from './UILayout.component'

describe('[UILayout] component', () => {
  it('should render component', () => {
    const container = render(<UILayout />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
