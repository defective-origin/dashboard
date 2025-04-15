// ---| self |---
import * as tools from './Date.tools'

describe('[Date] tools', () => {
  describe('[toDate] func', () => {
    it('should return string representation of date value', () => {
      expect(tools.toDate('2024-02-27')).toEqual('02/27/2024')
    })

    it('should work with string and number', () => {
      expect(tools.toDate('2024-02-27')).toEqual('02/27/2024')
      expect(tools.toDate(999_966_400_000)).toEqual('09/08/2001')
    })

    it('should return current value if date is not valid', () => {
      expect(tools.toDate('9999-99-99')).toEqual('9999-99-99')
    })
  })

  describe('[toDay] func', () => {
    it('should return day', () => {
      expect(tools.toDay('2024-02-27')).toEqual('27')
    })
  })

  describe('[toMonth] func', () => {
    it('should return month', () => {
      expect(tools.toMonth('2024-02-27')).toEqual('02')
    })
  })

  describe('[toYear] func', () => {
    it('should return year', () => {
      expect(tools.toYear('0023-02-27')).toEqual('23')
      expect(tools.toYear('2024-02-27')).toEqual('2024')
    })
  })

  describe('[toDayMonthYear] func', () => {
    it('should return date by pattern: "DAY/MONTH/YEAR"', () => {
      expect(tools.toDayMonthYear('2024-02-27')).toEqual('27/02/2024')
    })

    it('should return date with custom separators', () => {
      expect(tools.toDayMonthYear('2024-02-27', '.')).toEqual('27.02.2024')
    })
  })

  describe('[toDayOfMonthYear] func', () => {
    it('should return date by pattern: "DAYst of MONTH YEAR"', () => {
      expect(tools.toDayOfMonthYear('2024-01-01')).toEqual('1st of January 2024')
      expect(tools.toDayOfMonthYear('2024-01-02')).toEqual('2nd of January 2024')
      expect(tools.toDayOfMonthYear('2024-01-03')).toEqual('3rd of January 2024')
      expect(tools.toDayOfMonthYear('2024-01-11')).toEqual('11th of January 2024')
      expect(tools.toDayOfMonthYear('2024-01-27')).toEqual('27th of January 2024')
    })
  })

  describe('[toDayName] func', () => {
    it('should return weekday', () => {
      expect(tools.toDayName('2024-02-27')).toEqual('Tuesday')
    })
  })

  describe('[toMonthName] func', () => {
    it('should return month name', () => {
      expect(tools.toMonthName('2024-02-27')).toEqual('February')
    })
  })
})
