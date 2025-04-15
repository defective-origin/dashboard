// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Item from './Item.component'
// import useItem from './Item.hooks'
// import ItemProvider, Item from './Item.context'

describe('[Item] component', () => {
  it('should render component', () => {
    const container = render(<Item />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Item] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useItem())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Item] context', () => {
//   const wrapper = (props: ItemProps) => <ItemProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useItem(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
