import TagsField from './TagsField.component'


describe('[TagsField] component', () => {
  it('should render component', () => {
    const container = render(<TagsField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
