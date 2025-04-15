// ---| self |---
import * as tools from './theme.tools'


describe('[Theme] tools', () => {
  describe('[px] func', () => {
    it('should return converted value with px postfix', () => {
      expect(tools.px(10)).toEqual('10px')
      expect(tools.px('10')).toEqual('10px')
    })
  })

  describe('[toVariable] func', () => {
    it('should return converted value to css variable', () => {
      expect(tools.toVariable('name')).toEqual('var(--name)')
    })
    it('should return converted value to css variable with mode', () => {
      expect(tools.toVariable('name', 'mode')).toEqual('var(--name--mode)')
    })
  })

  describe('[toSpace] func', () => {
    it('should return converted value', () => {
      expect(tools.toSpace('xl')).toEqual('var(--space-size--xl)')
      expect(tools.toSpace('xl xl xl xl')).toEqual('var(--space-size--xl) var(--space-size--xl) var(--space-size--xl) var(--space-size--xl)')
      expect(tools.toSpace('xl/xl/xl/xl', '/')).toEqual('var(--space-size--xl)/var(--space-size--xl)/var(--space-size--xl)/var(--space-size--xl)')
    })

    it('should return not converted value if value is not in map', () => {
      expect(tools.toSpace('xl xl 0 xl')).toEqual('var(--space-size--xl) var(--space-size--xl) 0 var(--space-size--xl)')
      expect(tools.toSpace('xl/xl/0/xl', '/')).toEqual('var(--space-size--xl)/var(--space-size--xl)/0/var(--space-size--xl)')
    })
  })
})
