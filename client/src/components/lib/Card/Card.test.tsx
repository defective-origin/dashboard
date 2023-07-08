// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Card from './Card.component'

describe('[Card] component', () => {
  it('should render component', () => {
    const container = render(<Card />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
