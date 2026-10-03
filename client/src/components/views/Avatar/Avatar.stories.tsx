import { Meta, StoryObj, field, params } from 'storybook'
import Avatar from './Avatar.component'

const src = 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp'

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Components/Views/Avatar',
  tags: ['autodocs'],
  argTypes: {
    size: field.size('AvatarSize'),
    className: field.string(),
    content: field.reactNode(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Demo: Story = {
  parameters: params('Avatar'),
  args: {
    src,
    alt: 'User image',
    size: 'lg',
  },
}

export const AvatarGroup: Story = {
  parameters: params('Avatar group'),
  render: () => (
    <Avatar.Group max={4} size='sm' total={5000}>
      <Avatar alt='user 3' src={src} />
      <Avatar alt='user 4' src={src} />
    </Avatar.Group>
  ),
}
