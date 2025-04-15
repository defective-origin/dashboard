// ---| tests |---
import { render } from 'tests'

// ---| self |---
import SearchField from './SearchField.component'

describe('[SearchField] component', () => {
  it('should render component', () => {
    const container = render(<SearchField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
