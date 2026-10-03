import { Meta, StoryObj, field, params } from 'storybook'
import Actions from './Actions.component'
import Divider from 'components/layouts/Divider'

const VARIANTS = ['x', 'y']

const meta: Meta<typeof Actions> = {
  component: Actions,
  title: 'Components/Layouts/Actions',
  tags: ['autodocs'],
  argTypes: {
    g: field.size('BlockSpace'),
    size: field.size('Size'),
    v: field.variants(VARIANTS, 'BlockVariant', 'x'),
  },
}

export default meta

type Story = StoryObj<typeof Actions>

export const Demo: Story = {
  parameters: params('Actions'),
  args: {
    g: 'xxl',
  },
  render: props => {
    const CustomItem = () => 'Custom'

    return (
      <Actions size='lg' {...props}>
        <CustomItem />
        <Actions.Button tooltip='Edit' start='tv' />,
        <Actions.Button tooltip='Full screen' start='fullscreen' />,
        <Divider />
        <Actions.Link tooltip='Add Widget' start='add' />,
        <Actions.Link tooltip='Resize' start='computer' />,
        <Actions.Dropdown tooltip='Docs' start='book'>
          <Actions.Link tooltip='Full screen' start='fullscreen' />,
          <Actions.Dropdown tooltip='Add Widget' start='add'>
            <Actions.Link tooltip='Full screen' start='fullscreen' />,
          </Actions.Dropdown>
        </Actions.Dropdown>
        <Divider />
        <Actions.AppLink tooltip='Remove' start='delete' to='ROOT' />,
        <Actions.AppLink tooltip='Add to Menu' start='beenhere' to='BOARDS' />,
        <Actions.AppLink tooltip='Settings' start='settings' to='WIDGETS' />,
      </Actions>
    )
  },
}
