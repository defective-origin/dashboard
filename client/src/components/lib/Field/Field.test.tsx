// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Field from './Field.component'

describe('[Field] component', () => {
  it('should render component', () => {
    const container = render(<Field />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
