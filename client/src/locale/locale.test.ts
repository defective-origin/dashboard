import * as tools from './locale.tool'

describe('[Locale] tool', () => {
  describe('[getLocaleCode] action', () => {
    it.each([
      { value: 'AA-BB', result: { code: 'AA-BB', locale: 'AA', region: 'BB' } },
      { value: 'AA_BB', result: { code: 'AA_BB', locale: 'AA', region: 'BB' } },
    ])('should split code $value', ({ value, result }) => {
      expect(tools.getLocaleCode(value)).toEqual(result)
    })

    it('should take language from browser language', () => {
      vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('A-B')

      expect(tools.getLocaleCode()).toEqual({
        code: 'A-B',
        locale: 'A',
        region: 'B',
      })
    })

    it('should take language from browser languages', () => {
      vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['A-B'])

      expect(tools.getLocaleCode()).toEqual({
        code: 'A-B',
        locale: 'A',
        region: 'B',
      })
    })
  })
})
