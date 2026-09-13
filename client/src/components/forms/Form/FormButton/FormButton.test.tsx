import FormButton from './FormButton.component'


describe('[FormButton] component', () => {
  it('should render component', () => {
    const container = render(<FormButton />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
