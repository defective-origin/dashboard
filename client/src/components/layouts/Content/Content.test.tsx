// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Content from './Content.component'
// import useContent from './Content.hook'
// import ContentProvider, Content from './Content.context'

describe('[Content] component', () => {
  it('should render component', () => {
    const container = render(<Content />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
