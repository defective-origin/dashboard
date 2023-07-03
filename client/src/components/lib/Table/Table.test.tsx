// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Table from './Table.component'

describe('[Table] component', () => {
  it('should render component', () => {
    const container = render(<Table />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
