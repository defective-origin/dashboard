// ---| tests |---
import { render } from 'tests'

// ---| self |---
import CssSizeField from './CssSizeField.component'

describe('[CssSizeField] component', () => {
  it('should render component', () => {
    const container = render(<CssSizeField path='' formats={['fr']} />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
