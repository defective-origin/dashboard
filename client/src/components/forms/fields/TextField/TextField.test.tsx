// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TextField from './TextField.component'

describe('[TextField] component', () => {
  it('should render component', () => {
    const container = render(<TextField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
