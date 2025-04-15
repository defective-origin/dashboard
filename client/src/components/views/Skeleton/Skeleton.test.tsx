// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Skeleton from './Skeleton.component'
// import useSkeleton from './Skeleton.hooks'
// import SkeletonProvider, Skeleton from './Skeleton.context'

describe('[Skeleton] component', () => {
  it('should render component', () => {
    const container = render(<Skeleton />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Skeleton] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useSkeleton())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Skeleton] context', () => {
//   const wrapper = (props: SkeletonProps) => <SkeletonProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useSkeleton(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
