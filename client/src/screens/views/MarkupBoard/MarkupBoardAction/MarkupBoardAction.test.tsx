import MarkupBoardAction from './MarkupBoardAction.component'


describe('[MarkupBoardAction] component', () => {
  it('should render component', () => {
    const container = render(<MarkupBoardAction />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
