import MarkupsView from './MarkupsView.component'


describe('[MarkupsView] component', () => {
  it('should render component', () => {
    const container = render(<MarkupsView items={[{
      width: 992,
      height: '100%',
      areas: [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ],
      rows: ['1fr', '1fr', '1fr'],
      columns: ['1fr', '1fr', '1fr'],
      gap: ['4px', '4px'],
    }]} />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
