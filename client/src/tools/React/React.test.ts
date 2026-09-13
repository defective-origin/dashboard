import * as tools from './React.tools'


describe('[React] tools', () => {
  describe('[getElement] func', () => {
    it('should work with ref, callback and common element', () => {

      expect(tools.getElement(document.body)).toEqual(document.body)
      expect(tools.getElement(() => document.body)).toEqual(document.body)
      expect(tools.getElement({ current: document.body })).toEqual(document.body)
    })
    it('should return default if element is not selected', () => {
      expect(tools.getElement(() => null, document.body)).toEqual(document.body)
    })

  })
})
