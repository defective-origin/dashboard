// ---| self |---
import * as tools from './String.tools'

describe('[String] tools', () => {
  describe('[toString] func', () => {
    it('should return string', () => {
      expect(tools.toString('test')).toEqual('test')
    })

    it('should work with string and number', () => {
      expect(tools.toString('test test')).toEqual('test test')
      expect(tools.toString(10)).toEqual('10')
    })

    it('should trim whitespace', () => {
      expect(tools.toString('  test test ')).toEqual('test test')
    })
  })

  describe('[isString] func', () => {
    it('should return true if value is string', () => {
      expect(tools.isString('test')).toEqual(true)
    })

    it('should return false if value is not string', () => {
      expect(tools.isString(1)).toEqual(false)
      expect(tools.isString({})).toEqual(false)
      expect(tools.isString(null)).toEqual(false)
      expect(tools.isString(undefined)).toEqual(false)
    })
  })

  describe('[toUppercase] func', () => {
    it('should convert string to upper case', () => {
      expect(tools.toUppercase('test test')).toEqual('TEST TEST')
    })
  })

  describe('[toLowercase] func', () => {
    it('should convert string to lower case', () => {
      expect(tools.toLowercase('TEST TEST')).toEqual('test test')
    })
  })

  describe('[toCapital] func', () => {
    it('should convert first char of every word to upper case, rest chars to lower case', () => {
      expect(tools.toCapital('test TESt')).toEqual('Test Test')
    })
  })

  describe('[toTitle] func', () => {
    it('should convert only first char in sentence to upper case, rest chars to lower case', () => {
      expect(tools.toTitle('test TESt')).toEqual('Test test')
    })
  })
})
