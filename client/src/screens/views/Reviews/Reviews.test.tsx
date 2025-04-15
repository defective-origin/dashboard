// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Reviews from './Reviews.component'
// import useReviews from './Reviews.hooks'
// import ReviewsProvider, Reviews from './Reviews.context'

describe('[Reviews] component', () => {
  it('should render component', () => {
    const container = render(<Reviews />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Reviews] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useReviews())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Reviews] context', () => {
//   const wrapper = (props: ReviewsProps) => <ReviewsProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useReviews(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
