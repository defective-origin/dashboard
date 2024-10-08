import React, { useState } from 'react'

// ---| core |---
import { cn } from 'tools'
import { Dashboard } from 'api'
import { useLocale } from 'locale'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'
import Layout from 'components/Layout'
import Field from 'components/fields'
import ModalForm, { ModalFormProps } from 'components/ModalForm'

// ---| self |---
import css from './DashboardModalForm.module.scss'

export type DashboardModalFormProps = ModalFormProps<Dashboard>

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardModalForm />
 */
export function DashboardModalForm(props: DashboardModalFormProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DashboardModalForm, className)
  const locale = useLocale()
  const [options, setOptions] = useState<Dashboard>()

  // TODO: filter access by strict policy.
  const ACCESS_OPTIONS = [
    { value: 'private', children: locale.t('ACCESS.PRIVATE') },
    { value: 'public', children: locale.t('ACCESS.PUBLIC') },
    { value: 'subscription', children: locale.t('ACCESS.SUBSCRIPTION') },
  ]


  // TODO: by default set data from origin if not filled
  // TODO: add data selector for options to fields and form
  // TODO: implement via Form value when it's implemented
  return (
    <ModalForm className={_className} name='board-settings' title={locale.t('FORM.BOARD_SETTINGS')} onOpen={setOptions} {...otherProps}>
      <Layout v='board' columns={2} g='sm'>
        <Field.Text path='author' label={locale.t('FIELD.AUTHOR')} value={options?.author.toString()} disabled />
        <Field.Select path='access' label={locale.t('FIELD.ACCESS')} items={ACCESS_OPTIONS} value={options?.access} />
      </Layout>

      <Field.Text path='name' label={locale.t('FIELD.NAME')} value={options?.name} />
      <Field.Text path='description' label={locale.t('FIELD.DESCRIPTION')} value={options?.description} multiline />

      <Text.H3 content='Active layout' />
      <Layout v='board' columns={5} g='sm' >
        <Field.Switch path='tv' label='Tv' checked={options?.devices.tv?.active} />
        <Field.Switch path='computer' label='Computer' checked={options?.devices.computer?.active} />
        <Field.Switch path='tablet' label='Tablet' checked={options?.devices.tablet?.active} />
        <Field.Switch path='mobile' label='Mobile' checked={options?.devices.mobile?.active} />
        <Field.Switch path='watch' label='Watch' checked={options?.devices.watch?.active} />
      </Layout>

      {children}
    </ModalForm>
  )
}

DashboardModalForm.displayName = 'DashboardModalForm'

export default DashboardModalForm
