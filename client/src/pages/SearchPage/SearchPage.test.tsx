// ---| tests |---
import { render } from 'tests'

// ---| self |---
import SearchPage from './SearchPage.component'
// import useSearchPage from './SearchPage.hook'
// import SearchPageProvider, SearchPage from './SearchPage.context'

describe('[SearchPage] component', () => {
  it('should render component', () => {
    const container = render(<SearchPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[SearchPage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useSearchPage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[SearchPage] context', () => {
//   const wrapper = (props: SearchPageProps) => <SearchPageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useSearchPage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
