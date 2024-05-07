import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
import BasePage, { BasePageProps } from 'screens/BasePage'

// ---| components |---
import Form from 'components/Form'

// ---| self |---
import css from './WidgetPage.module.scss'
import { TextProps } from 'components/Text'
import { AlertItem } from 'components/Alerts'

export type WidgetPageProps = BasePageProps

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
    { color: 'success', content: 'success' },
    { color: 'error', content: 'error' },
    { color: 'warning', content: 'warning' },
    { color: 'info', content: 'info' },
    { color: 'primary', content: 'primary' },
    { color: 'secondary', content: 'secondary' },
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

  const formLog = ((...a: any) => console.log('Form', ...a)) as any
  // const log = ((...a: any) => console.log(...a)) as any
  const log = (() => {}) as any

  return (
    <BasePage className={_className} scroll='y' name='PAGES.WIDGETS' {...otherProps}>
      <Form name='FORM_NAME' onSubmit={formLog} onChange={formLog} onReset={log} p='xxl'>
        <Form.Alerts items={ALERTS} g='xs'>
          <Form.Alert color='success' content='success' />
          <Form.Alert color='info' content='info' />
          <Form.Alert color='warning' content='warning' />
          <Form.Alert color='error' content='error' />
        </Form.Alerts>

        <Form.Content g='xs'>
          <Form.Actions items={ACTIONS} />
          <Form.Actions>
            FORM ACTIONS
            <Form.Reset content='Reset' />
            <Form.Submit content='Submit' />
          </Form.Actions>

          <Form.Block className={_className} v='x' g='xs'>
            <Form.Field.Checkbox name='with' label='with' value='checkbox' messages={MESSAGES} checked onChange={log} />
            <Form.Field.Checkbox name='without' label='without' messages={MESSAGES} checked onChange={log} />
          </Form.Block>

          <Form.Block className={_className} v='x' g='xs'>
            <Form.Field.Radio name='radio' label='radio 1' value={1} messages={MESSAGES} onChange={log} checked />
            <Form.Field.Radio name='radio' label='radio 2' value={2} messages={MESSAGES} onChange={log} />
          </Form.Block>

          <Form.Block className={_className} v='x' g='xs'>
            <Form.Field.Switch name='switch1' label='switch1' messages={MESSAGES} onChange={log} />
            <Form.Field.Switch name='switch2' label='switch2' messages={MESSAGES} onChange={log} />
          </Form.Block>

          <Form.Block className={_className} v='x' g='xs'>
            <Form.Field.Slider name='slider' label='slider' value={75} messages={MESSAGES} onChange={log} />
            <Form.Field.Number name='number' label='number' value={75} messages={MESSAGES} onChange={log} />
          </Form.Block>

          <Form.Block className={_className} v='x' g='xs'>
            <Form.Field.Select name='select' label='select' value='value0' messages={MESSAGES} onChange={log} items={SELECT_OPTIONS} />
            <Form.Field.Text name='text' label='text' value='value' messages={MESSAGES} onChange={log} />
          </Form.Block>

          <Form.Field.Group name='group' label='group' messages={MESSAGES} onChange={log}>
            <Form.Actions>
              GROUP ACTIONS
              <Form.Reset content='Reset' />
              <Form.Submit content='Submit' />
            </Form.Actions>

            <Form.Content v='x' g='xs'>
              <Form.Field.Radio name='group-radio' label='radio' value={true} messages={MESSAGES} onChange={log} />
              <Form.Field.Switch name='group-switch' label='switch' value={true} messages={MESSAGES} onChange={log} />
              <Form.Field.Checkbox name='group-checkbox' label='checkbox' value='checkbox' messages={MESSAGES} checked onChange={log} />
              <Form.Field.Slider name='group-slider' label='slider' value={50} messages={MESSAGES} onChange={log} />
              <Form.Field.Select name='group-select' label='select' value='value0' messages={MESSAGES} onChange={log} items={SELECT_OPTIONS} />
              <Form.Field.Text name='group-text' label='text' value='value' messages={MESSAGES} onChange={log} />
              <Form.Field.Number name='group-number' label='number' value={50} messages={MESSAGES} onChange={log} />
            </Form.Content>
          </Form.Field.Group>

          <Form.Field.Group name='list' label='list' messages={MESSAGES} onChange={log} list>
            <Form.Actions>
              LIST ACTIONS
              <Form.Reset content='Reset' />
              <Form.Submit content='Submit' />
            </Form.Actions>

            <Form.Content v='x' g='xs'>
              <Form.Field.Radio name='item_0' label='radio' value={true} messages={MESSAGES} onChange={log} />
              <Form.Field.Switch name='item_1' label='switch' value={true} messages={MESSAGES} onChange={log} />
              <Form.Field.Checkbox name='item_2' label='checkbox' value='checkbox' messages={MESSAGES} checked onChange={log} />
              <Form.Field.Slider name='item_3' label='slider' value={25} messages={MESSAGES} onChange={log} />
              <Form.Field.Select name='item_4' label='select' value='value0' messages={MESSAGES} items={SELECT_OPTIONS} onChange={log} />
              <Form.Field.Text name='item_5' label='text' value='value' messages={MESSAGES} onChange={log} />
              <Form.Field.Number name='item_6' label='number' value={25} messages={MESSAGES} onChange={log} />
            </Form.Content>
          </Form.Field.Group>
        </Form.Content>

        <Form.Actions>
          GLOBAL FORM ACTIONS
          <Form.Actions.Button type='reset' content='Reset' />
          <Form.Actions.Button type='submit' content='Submit' />
        </Form.Actions>
      </Form>

      {children}
    </BasePage>
  )
}

WidgetPage.displayName = 'WidgetPage'

export default WidgetPage
