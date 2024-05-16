// ---| tests |---
import { render } from 'tests'

// ---| self |---
import PlaceholderCard from './PlaceholderCard.component'
// import usePlaceholderCard from './PlaceholderCard.hook'
// import PlaceholderCardProvider, PlaceholderCard from './PlaceholderCard.context'

describe('[PlaceholderCard] component', () => {
  it('should render component', () => {
    const container = render(<PlaceholderCard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[PlaceholderCard] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => usePlaceholderCard())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[PlaceholderCard] context', () => {
//   const wrapper = (props: PlaceholderCardProps) => <PlaceholderCardProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => usePlaceholderCard(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
