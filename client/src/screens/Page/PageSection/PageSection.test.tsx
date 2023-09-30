// ---| tests |---
import { render } from 'tests'

// ---| self |---
import PageSection from './PageSection.component'

describe('[PageSection] component', () => {
  it('should render component', () => {
    const container = render(<PageSection />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
