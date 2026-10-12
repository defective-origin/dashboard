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
    <Avatar.Group max={4} size='sm'>
      <Avatar alt='user 1' src={src} tooltip='Name 1' />
      <Avatar alt='user 2' src={src} tooltip='Name 2' />
      <Avatar alt='user 3' src={src} tooltip='Name 3' />
      <Avatar alt='user 4' src={src} tooltip='Name 4' />
      <Avatar alt='user 5' src={src} tooltip='Name 5' />
      <Avatar alt='user 6' src={src} tooltip='Name 6' />
    </Avatar.Group>
  ),
}
