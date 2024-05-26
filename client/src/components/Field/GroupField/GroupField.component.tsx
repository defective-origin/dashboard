import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { FormOptions, FormGroupValue, useForm, FormContext } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'

// ---| self |---
import css from './GroupField.module.scss'

export type GroupFieldProps = Pick<FormOptions<FormGroupValue>, 'value' | 'name' | 'onChange' | 'onSubmit' | 'onReset'> & {
  v?: LayoutProps['v']
  g?: LayoutProps['g']
  list?: boolean
  label?: string
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <GroupField />
 */
export function GroupField(props: GroupFieldProps): JSX.Element {
  const { v, g = 'xs', name, list, onChange, onSubmit, onReset, children, className, ...otherProps } = props
  const _className = cn(css.GroupField, className)
  const value = useMemo(() => list ? [] : {}, [list])
  const field = useForm({ value, name, onChange, onSubmit, onReset })

  return (
    <FormContext.Provider value={field} >
      <Layout className={_className} v={v} g={g} {...otherProps}>
        {children}
      </Layout>
    </FormContext.Provider>
  )
}

GroupField.displayName = 'GroupField'

export default GroupField
