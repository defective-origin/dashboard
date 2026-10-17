import Section from './Section.component'

describe('[Section] component', () => {
  it('should render component', () => {
    const container = render(
      <Section>
        <Section.Header>Header</Section.Header>
        <Section.Content>
          <Section.Scroll v='y' thin />
          Content
        </Section.Content>
      </Section>,
    )

    expect(container.snapshot()).toMatchSnapshot()
  })
})
