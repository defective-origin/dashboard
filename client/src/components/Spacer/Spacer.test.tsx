// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Spacer from './Spacer.component'

describe('[Spacer] component', () => {
  it('should render component', () => {
    const container = render(<Spacer />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
