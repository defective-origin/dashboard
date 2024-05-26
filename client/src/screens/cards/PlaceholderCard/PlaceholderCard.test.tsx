// ---| tests |---
import { render } from 'tests'

// ---| self |---
import PlaceholderCard from './PlaceholderCard.component'

describe('[PlaceholderCard] component', () => {
  it('should render component', () => {
    const container = render(<PlaceholderCard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
