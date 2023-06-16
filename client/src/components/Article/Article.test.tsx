// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Article from './Article.component'

describe('[Article] page', () => {
  it('should render component', () => {
    const container = render(<Article />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
