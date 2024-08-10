// ---| self |---
import * as tools from './Object.tool'


describe('[Object] tool', () => {
  describe('[toKeys] action', () => {
    it('should return empty array if path is not valid', () => {
      expect(tools.toKeys('')).toEqual([])
      expect(tools.toKeys(undefined)).toEqual([])
    })

    it('should split path and return keys', () => {
      expect(tools.toKeys('a.b.c')).toEqual(['a', 'b', 'c'])
    })
  })

  describe('[toPath] action', () => {
    it('should return empty string if keys is not passed', () => {
      expect(tools.toPath([])).toEqual('')
      expect(tools.toPath(undefined)).toEqual('')
    })

    it('should join keys to path', () => {
      expect(tools.toPath(['a', 'b', 'c'])).toEqual('a.b.c')
    })
  })

  describe('[toObject] action', () => {
    it('should return combined value value', () => {
      expect(tools.toObject({ a: 1 }, { b: 1 }, { a: 2 })).toEqual({ a: 2, b: 1 })
    })
  })

  describe('[isObject] action', () => {
    it('should return true if passed value is object', () => {
      expect(tools.isObject({})).toEqual(true)
      expect(tools.isObject(() => {})).toEqual(true)
    })

    it('should return false if passed value is not object', () => {
      expect(tools.isObject(0)).toEqual(false)
      expect(tools.isObject('')).toEqual(false)
    })
  })

  describe('[has] action', () => {
    it('should return true if object has nested value', () => {
      expect(tools.has({ a: { b: { c: 1 } } }, 'a')).toEqual(true)
      expect(tools.has({ a: { b: { c: 1 } } }, 'a.b')).toEqual(true)
      expect(tools.has({ a: { b: { c: 1 } } }, 'a.b.c')).toEqual(true)
    })

    it('should return false if object has not nested value', () => {
      expect(tools.has({ a: { b: { } } }, 'a.b.c')).toEqual(false)
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

  describe('[set] action', () => {
    it('should set nested value by path', () => {
      expect(tools.set({}, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } })
      expect(tools.set({ a: { b: {} } }, 'a.b.c', 1)).toEqual({ a: { b: { c: 1 } } })
    })

    it('should create array if key is number', () => {
      // eslint-disable-next-line no-sparse-arrays
      expect(tools.set({}, 'a.0.1', 1)).toEqual({ a: [[, 1]] })
    })
  })

  describe('[del] action', () => {
    it('should del nested value by path', () => {
      expect(tools.del({ a: { b: { c: 1 } } }, 'a.b.c')).toEqual({ a: { b: {} } })
      expect(tools.del({ a: { b: { c: 1, d: 2 } } }, 'a.b.c')).toEqual({ a: { b: { d: 2 } } })
      expect(tools.del({ a: { b: { c: 1 }, d: 2 } }, 'a.b.c')).toEqual({ a: { b: {}, d: 2 } })
      expect(tools.del({ a: { b: { c: 1 } }, d: 2 }, 'a.b.c')).toEqual({ a: { b: {} }, d: 2 })
    })

    it('should del nested value by path and empty objects', () => {
      expect(tools.del({ a: { b: { c: 1 } } }, 'a.b.c', true)).toEqual({})
      expect(tools.del({ a: { b: { c: 1, d: 2 } } }, 'a.b.c', true)).toEqual({ a: { b: { d: 2 } } })
      expect(tools.del({ a: { b: { c: 1 }, d: 2 } }, 'a.b.c', true)).toEqual({ a: { d: 2 } })
      expect(tools.del({ a: { b: { c: 1 } }, d: 2 }, 'a.b.c', true)).toEqual({ d: 2 })
    })
  })
})
