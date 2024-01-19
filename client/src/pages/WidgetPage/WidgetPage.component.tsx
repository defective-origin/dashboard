import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
import Page, { PageProps } from 'screens/Page'

// ---| components |---
import Form from 'components/Form'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './WidgetPage.module.scss'
import { TextProps } from 'components/Text'
import { AlertItem } from 'components/Alerts'

export type WidgetPageProps = PageProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <WidgetPage />
 */
export function WidgetPage(props: WidgetPageProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.WidgetPage, className)

  const MESSAGES: TextProps[] = [
    { color: 'error', content: 'error' },
    { color: 'warning', content: 'warning' },
    { color: 'info', content: 'info' },
    { color: 'primary', content: 'primary' },
    { color: 'secondary', content: 'secondary' },
    { color: 'disable', content: 'disable' },
  ]

  const ALERTS: AlertItem[] = [
    { color: 'success', content: 'success' },
    { color: 'info', content: 'info' },
    { color: 'warning', content: 'warning' },
    { color: 'error', content: 'error' },
  ]

  const ACTIONS = [
    { v: 'button', content: 'submit', type: 'submit' },
    { v: 'button', content: 'reset', type: 'reset' },
  ]

  const SELECT_OPTIONS = [
    { value: 'value0', children: 'FIRST' },
    { value: 'value1', children: 'SECOND' },
    { value: 'value2', children: 'THIRD' },
  ]

  // const log = ((a: any, b: any, c: any) => console.log(a, {...b}, c)) as any
  const log = ((a: any, b: any, c: any) => {}) as any

  return (
    <Page className={_className} name='PAGES.WIDGETS' scroll='y' {...otherProps}>
      <Form name='FORM_NAME' onSubmit={log} onReset={log} onChange={log} padding='xxl'>
        <Form.Alerts items={ALERTS} gap='xs'>
          <Form.Alert color='success' content='success' />
          <Form.Alert color='info' content='info' />
          <Form.Alert color='warning' content='warning' />
          <Form.Alert color='error' content='error' />
        </Form.Alerts>

        <Form.Content gap='xs'>
          <Form.Actions items={ACTIONS} />
          <Form.Actions>
            FORM ACTIONS
            <Form.Reset content='Reset' />
            <Form.Submit content='Submit' />
          </Form.Actions>

          <Form.Block className={_className} direction='x' gap='xs'>
            <Form.Field.Radio name='radio' label='radio' value={true} messages={MESSAGES} onChange={log} />
            <Form.Field.Switch name='switch' label='switch' value={true} messages={MESSAGES} onChange={log} />
            <Form.Field.Checkbox name='checkbox' label='checkbox' value='checkbox' messages={MESSAGES} checked onChange={log} />
            <Form.Field.Slider name='slider' label='slider' value={0} messages={MESSAGES} onChange={log} />
            <Form.Field.Select name='select' label='select' value='value0' messages={MESSAGES} onChange={log} items={SELECT_OPTIONS} />
            <Form.Field.Text name='text' label='text' value='value' messages={MESSAGES} onChange={log} />
            <Form.Field.Number name='number' label='number' value={0} messages={MESSAGES} onChange={log} />
          </Form.Block>

          <Form.Group name='group' label='group' messages={MESSAGES} onChange={log}>
            <Form.Actions>
              GROUP ACTIONS
              <Form.Reset content='Reset' />
              <Form.Submit content='Submit' />
            </Form.Actions>

            <Form.Content direction='x' gap='xs'>
              <Form.Field.Radio name='group-radio' label='radio' value={true} messages={MESSAGES} onChange={log} />
              <Form.Field.Switch name='group-switch' label='switch' value={true} messages={MESSAGES} onChange={log} />
              <Form.Field.Checkbox name='group-checkbox' label='checkbox' value='checkbox' messages={MESSAGES} checked onChange={log} />
              <Form.Field.Slider name='group-slider' label='slider' value={0} messages={MESSAGES} onChange={log} />
              <Form.Field.Select name='group-select' label='select' value='value0' messages={MESSAGES} onChange={log} items={SELECT_OPTIONS} />
              <Form.Field.Text name='group-text' label='text' value='value' messages={MESSAGES} onChange={log} />
              <Form.Field.Number name='group-number' label='number' value={0} messages={MESSAGES} onChange={log} />
            </Form.Content>
          </Form.Group>

          <Form.List name='list' label='list' messages={MESSAGES} onChange={log}>
            <Form.Actions>
              LIST ACTIONS
              <Form.Reset content='Reset' />
              <Form.Submit content='Submit' />
            </Form.Actions>

            <Form.Content direction='x' gap='xs'>
              <Form.Field.Radio name='item_2' label='radio' value={true} messages={MESSAGES} />
              <Form.Field.Switch name='item_3' label='switch' value={true} messages={MESSAGES} />
              <Form.Field.Checkbox name='item_4' label='checkbox' value='checkbox' messages={MESSAGES} checked />
              <Form.Field.Slider name='item_6' label='slider' value={0} messages={MESSAGES} />
              <Form.Field.Select name='item_5' label='select' value='value0' messages={MESSAGES} items={SELECT_OPTIONS} />
              <Form.Field.Text name='item_0' label='text' value='value' messages={MESSAGES} onChange={log} />
              <Form.Field.Number name='item_1' label='number' value={0} messages={MESSAGES} />
            </Form.Content>
          </Form.List>
        </Form.Content>

        <Form.Actions>
          GLOBAL FORM ACTIONS
          <Form.Actions.Button type='reset' content='Reset' />
          <Form.Actions.Button type='submit' content='Submit' />
        </Form.Actions>
      </Form>

      {children}
    </Page>
  )
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
