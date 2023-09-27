// ---| tests |---
import { render } from 'tests'

// ---| self |---
import MenuButton from './MenuButton.component'

describe('[MenuButton] component', () => {
  it('should render component', () => {
    const container = render(<MenuButton />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
