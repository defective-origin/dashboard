// ---| self |---
import * as tools from './Mix.tools'


describe('[Mix] tools', () => {
  describe('[fromValOrFunc] func', () => {
    type Prop = tools.ValOrFunc<number, [number, number]>

    it('should return value from function', () => {
      const func: Prop = (val1, val2) => val1 + val2

      expect(tools.fromValOrFunc(func, 1, 2)).toEqual(3)
    })

    it('should return value as is', () => {
      const value: Prop = 5

      expect(tools.fromValOrFunc(value)).toEqual(5)
    })
  })


  describe('[arrToObj] func', () => {
    it('should return object from simple array', () => {
      expect(tools.arrToObj([1, 2], item => item)).toEqual({ 1: 1, 2: 2 })
    })

    it('should return object from array of object', () => {
      expect(tools.arrToObj([{ field: 1 }, { field: 2 }], item => item.field)).toEqual({
        1: { field: 1 },
        2: { field: 2 },
      })
    })

    it('should return object with modified value', () => {
      expect(tools.arrToObj([1, 2], (item, idx) => [item, item + idx])).toEqual({ 1: 1, 2: 3 })
    })
  })
})
