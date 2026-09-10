import { Meta, StoryObj, field, params } from 'storybook'
import DonationTable from './DonationTable.component'

const meta: Meta<typeof DonationTable> = {
  component: DonationTable,
  title: 'Screens/Tables/DonationTable',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof DonationTable>

export const Demo: Story = {
  parameters: params('DonationTable'),
  args: {
    width: 760,
    height: 500,
  },
}
