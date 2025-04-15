// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Review from './Review.component'
// import useReview from './Review.hooks'
// import ReviewProvider, Review from './Review.context'

describe('[Review] component', () => {
  it('should render component', () => {
    const container = render(<Review />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Review] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useReview())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Review] context', () => {
//   const wrapper = (props: ReviewProps) => <ReviewProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useReview(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
