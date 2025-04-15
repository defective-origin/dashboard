// ---| tests |---
import { render } from 'tests'

// ---| self |---
import ReviewsModal from './ReviewsModal.component'
// import useReviewsModal from './ReviewsModal.hooks'
// import ReviewsModalProvider, ReviewsModal from './ReviewsModal.context'

describe('[ReviewsModal] component', () => {
  it('should render component', () => {
    const container = render(<ReviewsModal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[ReviewsModal] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useReviewsModal())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[ReviewsModal] context', () => {
//   const wrapper = (props: ReviewsModalProps) => <ReviewsModalProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useReviewsModal(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
