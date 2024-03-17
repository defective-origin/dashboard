// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Format from './Format.component'
import * as tools from './Format.tool'
// import useFormat from './Format.hook'
// import FormatProvider, Format from './Format.context'

describe('[Format] component', () => {
  it('should render component', () => {
    const container = render(<Format v='uppercase' value='uppercase'/>)

    expect(container.snapshot()).toMatchSnapshot()
  })

  it('should render default N/A placeholder if value is undefined or null', () => {
    const container = render(<Format placeholder/>)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Format] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useFormat())
//
//     expect(result.current).toBe(null)
//   })
// })

// describe('[Format] context', () => {
//   const wrapper = (props: FormatProps) => <FormatProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useFormat(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
