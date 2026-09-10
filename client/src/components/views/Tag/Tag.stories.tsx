import { Meta, StoryObj, field, params, theme} from 'storybook'
import Block from 'components/layouts/Block'
import TextStoriesMeta from 'components/views/Text/Text.stories'
import Tag, { TagProps } from './Tag.component'

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'Components/Views/Tag',
  tags: ['autodocs'],
  argTypes: {
    outline: field.boolean(),
    ...TextStoriesMeta.argTypes,
  },
}

export default meta

type Story = StoryObj<typeof Tag>

const initVariants = <P extends keyof TagProps>(prop: P, items: TagProps[P][]) => (
  <Block v='xy' minWidth={200} g='xs' aligns='center'>
    {items.map((item, idx) => <Tag key={idx} content={item as string} {...{ [prop]: item }}/>)}
  </Block>
)

export const Demo: Story = {
  parameters: params('**Tag** component support all [Text component](?path=/docs/components-data-display-text--docs) props'),
  args: {
    content: 'sOmE TeXt',
    outline: false,
    loading: false,
    bold: false,
  },
}

export const Sizes: Story = {
  parameters: params('Size', theme.SIZES),
  render: () => initVariants('size', theme.SIZES),
}

export const Colors: Story = {
  parameters: params('Color', theme.COLORS),
  render: () => initVariants('color', theme.COLORS),
}

export const Loading: Story = {
  parameters: params('If `loading` is `true` the Skeleton component is shown.'),
  args: {
    content: 'content to hide',
    loading: true,
  },
}
