// ---| self |---
import * as tools from './Array.tool'


describe('[Array] tool', () => {
  describe('[initArray] action', () => {
    it('should return positive array without null, undefined, 0, false values', () => {
      expect(tools.initArray(0, 1, '', '-', null, undefined, false, true)).toEqual([1, '-', true])
    })
  })

  describe('[toArray] action', () => {
    it('should convert value to array', () => {
      expect(tools.toArray(1)).toEqual([1])
      expect(tools.toArray('-')).toEqual(['-'])
      expect(tools.toArray(true)).toEqual([true])
    })

    it('should return empty array if value is false', () => {
      expect(tools.toArray(0)).toEqual([])
      expect(tools.toArray('')).toEqual([])
      expect(tools.toArray(false)).toEqual([])
      expect(tools.toArray(null)).toEqual([])
      expect(tools.toArray(undefined)).toEqual([])
    })

    it('should return passed value if value is array', () => {
      expect(tools.toArray([1, 2])).toEqual([1, 2])
      expect(tools.toArray([])).toEqual([])
    })
  })

  describe('[sort] action', () => {
    it('should work with different types', () => {
      const date1 = new Date('1'), date2 = new Date('2'), date3 = new Date('3')

      expect(tools.sort([0, undefined, null, 1, 2])).toEqual([0, 1, 2, null, undefined])
      expect(tools.sort(['', undefined, null, '1', '2'])).toEqual(['', '1', '2', null, undefined])
      expect(tools.sort([date1, undefined, null, date2, date3])).toEqual([date1, date2, date3, null, undefined])
      expect(tools.sort([false, undefined, null, true])).toEqual([false, true, null, undefined])
    })

    it('should leave null and undefined values in the end of the list', () => {
      const items = [0, undefined, null, 1, 2]

      expect(tools.sort(items, 'asc')).toEqual([0, 1, 2, null, undefined])
      expect(tools.sort(items, 'desc')).toEqual([2, 1, 0, null, undefined])
    })

    it('should sort object array by selector', () => {
      const obj1 = { field: 1 }, obj2 = { field: 2 }, obj3 = { field: 3 }, objNull = { field: null }, objUndefined = { field: undefined }
      const items = [objNull, obj1, obj3, obj2, objUndefined]

      expect(tools.sort(items, 'asc', (item) => item.field)).toEqual([obj1, obj2, obj3, objNull, objUndefined])
      expect(tools.sort(items, 'desc', (item) => item.field)).toEqual([obj3, obj2, obj1, objNull, objUndefined])
    })
  })

  describe('[repeat] action', () => {
    it('should create items x times', () => {
      expect(tools.repeat(4, (index) => index)).toEqual([0, 1, 2, 3])
    })
  })
})
