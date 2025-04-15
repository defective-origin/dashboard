// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Aside from './Aside.component'
// import useAside from './Aside.hooks'
// import AsideProvider, Aside from './Aside.context'

describe('[Aside] component', () => {
  it('should render component', () => {
    const container = render(<Aside />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
