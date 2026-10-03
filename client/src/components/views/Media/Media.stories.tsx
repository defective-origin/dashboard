import { Meta, StoryObj, field, params } from 'storybook'
import Media from './Media.component'


const meta: Meta<typeof Media> = {
  component: Media,
  title: 'Components/Views/Media',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
  },
}

export default meta

type Story = StoryObj<typeof Media>

export const Demo: Story = {
  parameters: params('Media'),
  args: {
    className: 'Demo',
    v: 'logo',
  },
}
