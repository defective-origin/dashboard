// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Progress from './Progress.component'

describe('[Progress] component', () => {
  it('should render component', () => {
    const container = render(<Progress />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
