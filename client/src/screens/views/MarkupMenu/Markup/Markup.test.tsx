// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Markup from './Markup.component'
// import useMarkup from './Markup.hooks'
// import MarkupProvider, Markup from './Markup.context'

describe('[Markup] component', () => {
  it('should render component', () => {
    const container = render(<Markup />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Markup] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useMarkup())
//
//     expect(result.current).toEqual(null)
//   })
// })
