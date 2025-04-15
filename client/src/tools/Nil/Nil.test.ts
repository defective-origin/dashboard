// ---| self |---
import * as tools from './Nil.tools'

describe('[Nil] tools', () => {
  describe('[isNull] func', () => {
    it('should return true if value is null', () => {
      expect(tools.isNull(null)).toEqual(true)
      expect(tools.isNull(0)).toEqual(false)
      expect(tools.isNull('')).toEqual(false)
      expect(tools.isNull(false)).toEqual(false)
      expect(tools.isNull({})).toEqual(false)
      expect(tools.isNull(undefined)).toEqual(false)
    })
  })

  describe('[isUndefined] func', () => {
    it('should return true if value is undefined', () => {
      expect(tools.isUndefined(undefined)).toEqual(true)
      expect(tools.isUndefined(0)).toEqual(false)
      expect(tools.isUndefined('')).toEqual(false)
      expect(tools.isUndefined(false)).toEqual(false)
      expect(tools.isUndefined({})).toEqual(false)
      expect(tools.isUndefined(null)).toEqual(false)
    })
  })

  describe('[isNil] func', () => {
    it('should return true if value is undefined or null', () => {
      expect(tools.isNil(undefined)).toEqual(true)
      expect(tools.isNil(null)).toEqual(true)
      expect(tools.isNil(0)).toEqual(false)
      expect(tools.isNil('')).toEqual(false)
      expect(tools.isNil(false)).toEqual(false)
      expect(tools.isNil({})).toEqual(false)
    })
  })

})
