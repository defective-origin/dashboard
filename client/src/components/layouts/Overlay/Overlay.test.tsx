// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Overlay from './Overlay.component'
// import useOverlay from './Overlay.hook'
// import OverlayProvider, Overlay from './Overlay.context'

describe('[Overlay] component', () => {
  it('should render component', () => {
    const container = render(<Overlay />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
