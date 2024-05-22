// ---| tests |---
import { render } from 'tests'

// ---| self |---
import SelectPage from './SelectPage.component'
// import useSelectPage from './SelectPage.hook'
// import SelectPageProvider, SelectPage from './SelectPage.context'

describe('[SelectPage] component', () => {
  it('should render component', () => {
    const container = render(<SelectPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[SelectPage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useSelectPage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[SelectPage] context', () => {
//   const wrapper = (props: SelectPageProps) => <SelectPageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useSelectPage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
