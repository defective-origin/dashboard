// ---| self |---
import * as tools from './String.tool'

describe('[String] tool', () => {
  describe('[toString] action', () => {
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

  describe('[toUppercase] action', () => {
    it('should convert string to upper case', () => {
      expect(tools.toUppercase('test test')).toEqual('TEST TEST')
    })
  })

  describe('[toLowercase] action', () => {
    it('should convert string to lower case', () => {
      expect(tools.toLowercase('TEST TEST')).toEqual('test test')
    })
  })

  describe('[toCapital] action', () => {
    it('should convert first char of every word to upper case, rest chars to lower case', () => {
      expect(tools.toCapital('test TESt')).toEqual('Test Test')
    })
  })

  describe('[toTitle] action', () => {
    it('should convert only first char in sentence to upper case, rest chars to lower case', () => {
      expect(tools.toTitle('test TESt')).toEqual('Test test')
    })
  })
})
