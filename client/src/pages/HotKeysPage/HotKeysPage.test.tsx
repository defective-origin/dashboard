// ---| tests |---
import { render } from 'tests'

// ---| self |---
import HotKeysPage from './HotKeysPage.component'

describe('[HotKeysPage] component', () => {
  it('should render component', () => {
    const container = render(<HotKeysPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
