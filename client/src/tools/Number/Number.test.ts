// ---| self |---
import * as tools from './Number.tool'

describe('[Number] tool', () => {
  describe('[toNumber] action', () => {
    it('should return string representation of number value', () => {
      expect(tools.toNumber(0)).toEqual('0.00')
      expect(tools.toNumber(0.5555)).toEqual('0.55')
      expect(tools.toNumber(0, { isInt: true })).toEqual('0')
      expect(tools.toNumber(0.5555, { isInt: true })).toEqual('0')
    })

    it('should work with string and number', () => {
      expect(tools.toNumber('0')).toEqual('0.00')
      expect(tools.toNumber(0)).toEqual('0.00')
    })

    it('should work with positive and negative numbers', () => {
      // expect(tools.toNumber(-Infinity)).toEqual('-Infinity')
      expect(tools.toNumber('-1')).toEqual('-1.00')
      expect(tools.toNumber('0')).toEqual('0.00')
      expect(tools.toNumber('1')).toEqual('1.00')
      // expect(tools.toNumber(Infinity)).toEqual('Infinity')
    })

    it('should separate each 3 digits by comma and dot before fraction part', () => {
      expect(tools.toNumber(1)).toEqual('1.00')
      expect(tools.toNumber(1_000)).toEqual('1,000.00')
      expect(tools.toNumber(100_000)).toEqual('100,000.00')
    })

    it('should not round digits up', () => {
      expect(tools.toNumber(4.4444)).toEqual('4.44')
      expect(tools.toNumber(5.5555)).toEqual('5.55')
      expect(tools.toNumber(9.9999)).toEqual('9.99')
    })
  })

  describe('[toCurrency] action', () => {
    it('should return string representation of number value with relevant currency postfix', () => {
      expect(tools.toCurrency(10)).toEqual('10.00 $')
      expect(tools.toCurrency(1_000)).toEqual('1.00 K$')
      expect(tools.toCurrency(1_000_000)).toEqual('1.00 M$')
      expect(tools.toCurrency(1_000_000_000)).toEqual('1.00 B$')
    })
  })

  describe('[toSize] action', () => {
    it('should return string representation of number value with relevant size postfix', () => {
      expect(tools.toSize(10)).toEqual('10.00 B')
      expect(tools.toSize(1024.56)).toEqual('1.00 KB')
      expect(tools.toSize(25_451_215)).toEqual('24.27 MB')
      expect(tools.toSize(2_545_121_525_569)).toEqual('2.31 TB')
    })
  })

  describe('[toWeight] action', () => {
    it('should return string representation of number value with relevant weight postfix', () => {
      expect(tools.toWeight(100)).toEqual('100.00 G')
      expect(tools.toWeight(1_567.99)).toEqual('1.56 KG')
      expect(tools.toWeight(1_000_000)).toEqual('1.00 T')
    })
  })

  describe('[toAmount] action', () => {
    it('should return string representation of integer number value', () => {
      expect(tools.toAmount(0.6)).toEqual('0')
      expect(tools.toAmount(1.2)).toEqual('1')
      expect(tools.toAmount(100.52)).toEqual('100')
    })
  })

  describe('[toPercent] action', () => {
    it('should convert number to string representation of number value with % postfix', () => {
      expect(tools.toPercent(100)).toEqual('100.00 %')
      expect(tools.toPercent(52.799)).toEqual('52.79 %')
    })
  })

  describe('[toDecimalPercent] action', () => {
    it('should convert decimal to string representation of number value with % postfix', () => {
      expect(tools.toDecimalPercent(0.7999)).toEqual('79.99 %')
      expect(tools.toDecimalPercent(1)).toEqual('100.00 %')
    })
  })
})

