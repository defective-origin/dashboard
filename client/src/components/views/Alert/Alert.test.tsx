// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Alert from './Alert.component'

describe('[Alert] component', () => {
  it('should render component', () => {
    const container = render(<Alert />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
