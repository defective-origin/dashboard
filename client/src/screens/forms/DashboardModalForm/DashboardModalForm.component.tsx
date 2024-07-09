import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Board } from 'api'
import { t } from 'locale'

// ---| pages |---
// ---| screens |---
import FeatureModalForm, { FeatureModalFormProps } from '../FeatureModalForm'

// ---| components |---

// ---| self |---
import css from './DashboardModalForm.module.scss'

export type DashboardModalFormProps = FeatureModalFormProps<Board>

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

  return (
    <FeatureModalForm className={_className} name='board-settings' title={t('FORM.BOARD_SETTINGS')} {...otherProps}>
      {/* <Text.H3 content='Active layout' /> */}
      {/* <Layout v='board' columns={5} g='sm' >
        <Field.Switch path='tv' label='Tv' checked={options?.markups.tv?.active} />
        <Field.Switch path='computer' label='Computer' checked={options?.markups.computer?.active} />
        <Field.Switch path='tablet' label='Tablet' checked={options?.markups.tablet?.active} />
        <Field.Switch path='mobile' label='Mobile' checked={options?.markups.mobile?.active} />
        <Field.Switch path='watch' label='Watch' checked={options?.markups.watch?.active} />
      </Layout> */}

      {children}
    </FeatureModalForm>
  )
}

DashboardModalForm.displayName = 'DashboardModalForm'

export default DashboardModalForm
