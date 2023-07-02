// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Icon from './Icon.component'

describe('[Icon] component', () => {
  it('should render component', () => {
    const container = render(<Icon type='close' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
