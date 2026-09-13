import PreviewCard from './PreviewCard.component'


describe('[PreviewCard] component', () => {
  it('should render component', () => {
    const container = render(<PreviewCard />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
