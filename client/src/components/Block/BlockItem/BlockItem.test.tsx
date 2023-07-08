// ---| tests |---
import { render } from 'tests'

// ---| self |---
import BlockItem from './BlockItem.component'

describe('[BlockItem] component', () => {
  it('should render component', () => {
    const container = render(<BlockItem />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
