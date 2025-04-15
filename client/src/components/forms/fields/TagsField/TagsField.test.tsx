// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TagsField from './TagsField.component'
// import useTagsField from './TagsField.hooks'
// import TagsFieldProvider, TagsField from './TagsField.context'

describe('[TagsField] component', () => {
  it('should render component', () => {
    const container = render(<TagsField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[TagsField] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTagsField())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[TagsField] context', () => {
//   const wrapper = (props: TagsFieldProps) => <TagsFieldProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTagsField(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
