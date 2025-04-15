// ---| tests |---
import { render } from 'tests'

// ---| self |---
import JsonField from './JsonField.component'
// import useJsonField from './JsonField.hooks'
// import JsonFieldProvider, JsonField from './JsonField.context'

describe('[JsonField] component', () => {
  it('should render component', () => {
    const container = render(<JsonField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[JsonField] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useJsonField())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[JsonField] context', () => {
//   const wrapper = (props: JsonFieldProps) => <JsonFieldProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useJsonField(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
