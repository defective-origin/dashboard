// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Block from './Block.component'

describe('[Block] component', () => {
  it('should render component', () => {
    const container = render(<Block />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
