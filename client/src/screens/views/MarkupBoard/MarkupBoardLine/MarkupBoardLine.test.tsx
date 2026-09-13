import MarkupBoardLine from './MarkupBoardLine.component'


describe('[MarkupBoardLine] component', () => {
  it('should render component', () => {
    const container = render(<MarkupBoardLine />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
