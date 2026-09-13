import ExpensesTable from './ExpensesTable.component'


describe('[ExpensesTable] component', () => {
  it('should render component', () => {
    const container = render(<ExpensesTable />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
