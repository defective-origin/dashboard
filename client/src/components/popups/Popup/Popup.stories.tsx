import { Meta, StoryObj, field, params } from 'storybook'
import Block from 'components/layouts/Block'
import Item from 'components/layouts/Item'
import Text from 'components/views/Text'
import Popup, { PopupProps, PopupTriggerOptions } from './Popup.component'

const trigger = (o: PopupTriggerOptions) => <Item width={50} height={50} bg={o.isOn ? 'primary' : undefined} border />

const VARIANTS: PopupProps['v'][] = [
  'left-start', 'top-end', 'top', 'top-start', 'right-start',
  'left', undefined, undefined, undefined, 'right',
  'left-end', 'bottom-end', 'bottom', 'bottom-start', 'right-end',
]

const meta: Meta<typeof Popup> = {
  component: Popup,
  title: 'Components/Popups/Popup',
  tags: ['autodocs'],
  argTypes: {
    v: field.variants(VARIANTS, 'PopupVariant'),
    trigger: field.func(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Popup>

const initVariants = <P extends keyof PopupProps>(prop: P, items: PopupProps[P][]) => (
  <Block g='xl' p='xl' justify='space-between' columns={5}>
    {items.map((item, idx) => item
      ? (
        <Popup
          key={idx}
          trigger={trigger}
          {...{ [prop]: item }}
        >
          <Text color='primary'>Content</Text>
        </Popup>
      )
      : <div key={idx} />,
    )}
  </Block>
)

export const Demo: Story = {
  parameters: params('Popup'),
  args: {
    children: <Text color='primary'>Content</Text>,
    trigger,
    v: 'top',
  },
}

export const Variants: Story = {
  parameters: params('View', VARIANTS),
  render: () => initVariants('v', VARIANTS),
}
