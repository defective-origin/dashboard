// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Popup from './Popup.component'
// import usePopup from './Popup.hooks'
// import PopupProvider, Popup from './Popup.context'

describe('[Popup] component', () => {
  it('should render component', () => {
    const container = render(<Popup />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
