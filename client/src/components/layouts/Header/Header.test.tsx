// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Header from './Header.component'
// import useHeader from './Header.hook'
// import HeaderProvider, Header from './Header.context'

describe('[Header] component', () => {
  it('should render component', () => {
    const container = render(<Header />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
