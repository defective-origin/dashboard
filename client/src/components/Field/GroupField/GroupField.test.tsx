// ---| tests |---
import { render } from 'tests'

// ---| self |---
import GroupField from './GroupField.component'
// import useGroupField from './GroupField.hook'
// import GroupFieldProvider, GroupField from './GroupField.context'

describe('[GroupField] component', () => {
  it('should render component', () => {
    const container = render(<GroupField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[GroupField] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useGroupField())
//
//     expect(result.current).toBe(null)
//   })
// })

// describe('[GroupField] context', () => {
//   const wrapper = (props: GroupFieldProps) => <GroupFieldProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useGroupField(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
