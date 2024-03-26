// ---| tests |---
import { render } from 'tests'

// ---| self |---
import BannerPage from './BannerPage.component'
// import useBannerPage from './BannerPage.hook'
// import BannerPageProvider, BannerPage from './BannerPage.context'

describe('[BannerPage] component', () => {
  it('should render component', () => {
    const container = render(<BannerPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[BannerPage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useBannerPage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[BannerPage] context', () => {
//   const wrapper = (props: BannerPageProps) => <BannerPageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useBannerPage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
