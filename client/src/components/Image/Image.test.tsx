// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Image from './Image.component'

describe('[Image] component', () => {
  it('should render component', () => {
    const container = render(<Image />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
