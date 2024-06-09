// ---| self |---
import * as tools from './Object.tool'


describe('[Object] tool', () => {
  describe('[toObject] action', () => {
    it('should return combined value value', () => {
      expect(tools.toObject({ a: 1 }, { b: 1 }, { a: 2 })).toEqual({ a: 2, b: 1 })
    })
  })

  describe('[get] action', () => {
    it('should return nested value', () => {
      expect(tools.get({ a: { b: { c: 1 } } }, 'a.b.c')).toEqual(1)
    })

    it('should return undefined if value is not exist', () => {
      expect(tools.get({ a: { b: { c: 1 } } }, 'a.v')).toEqual(undefined)
    })
  })
})
