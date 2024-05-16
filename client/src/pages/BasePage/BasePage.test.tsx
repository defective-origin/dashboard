// ---| tests |---
import { render } from 'tests'

// ---| self |---
import BasePage from './BasePage.component'
// import useBasePage from './BasePage.hook'
// import BasePageProvider, BasePage from './BasePage.context'

describe('[BasePage] component', () => {
  it('should render component', () => {
    const container = render(<BasePage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[BasePage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useBasePage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[BasePage] context', () => {
//   const wrapper = (props: BasePageProps) => <BasePageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useBasePage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
