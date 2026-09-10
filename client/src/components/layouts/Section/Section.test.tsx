import Section from './Section.component'

describe('[Section] component', () => {
  it('should render component', () => {
    const container = render(<Section title='Title'>content</Section>)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
