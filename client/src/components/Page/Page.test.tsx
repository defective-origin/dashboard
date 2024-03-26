// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Page from './Page.component'
// import usePage from './Page.hook'
// import PageProvider, Page from './Page.context'

describe('[Page] component', () => {
  it('should render component', () => {
    const container = render(<Page />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Page] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => usePage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Page] context', () => {
//   const wrapper = (props: PageProps) => <PageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => usePage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
