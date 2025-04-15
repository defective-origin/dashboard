/* eslint-disable no-restricted-imports */
import { SB_CSS, field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import Popup, { PopupProps, PopupTriggerOptions } from './Popup.component'
import Layout from 'components/layouts/Layout'
import Item from 'components/layouts/Item'
import Text from 'components/views/Text'

const trigger = (o: PopupTriggerOptions) => <Item width={50} height={50} background={o.isOn ? 'orange' : SB_CSS.item} />

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
  <Layout g='xl' p='xl' justify='space-between' columns={5}>
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
  </Layout>
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
