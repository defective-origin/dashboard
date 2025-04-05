// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Footer from './Footer.component'
// import useFooter from './Footer.hook'
// import FooterProvider, Footer from './Footer.context'

describe('[Footer] component', () => {
  it('should render component', () => {
    const container = render(<Footer />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
