import React from 'react'
import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from '@mui/material'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import { useItem, ItemProps } from 'components/layouts/Item'

// ---| self |---
import css from './Tabs.module.scss'
import Tab from './Tab'
import { TabsProvider, useTabs } from './Tabs.context'
import TabContent from './TabContent'

export type TabsProps = Pick<MuiTabsProps, 'value'> & ItemProps & {
  className?: string
  children?: React.ReactNode
}

/**
 * Allows to bind tab content with tab button.
 *
 * How to use
 * @example
 * <Tabs.Provider value='OPTIONS'>
 *   <Tabs p='xs'>
 *     <Tabs.Tab label='Options' value='OPTIONS' icon={<Icon v='data_object' />} iconPosition='start' />
 *     <Tabs.Tab label='Details' value='DETAILS' icon={<Icon v='info' />} iconPosition='start' />
 *   </Tabs>
 *
 *   <Block v='y' g='xxs' p='xs' justify='stretch'>
 *     <Scroll v='y' size='xxs' />
 *
 *     <Tabs.TabContent value='OPTIONS'>
 *       <Field.Json path='options' />
 *     </Tabs.TabContent>
 *     <Tabs.TabContent value='DETAILS'>
 *       <User id={options?.id} />
 *       <Layout columns={3} g='xxs'>
 *         <Field.Checkbox path='public' label={t('LABEL.PUBLIC')} />
 *         <Field.Number path='price' label={t('LABEL.PRICE')} />
 *         <Field.Text path='updatedAt' label={t('LABEL.LAST_UPDATE')} disabled />
 *       </Layout>
 *       <Field.Text path='name' label={t('LABEL.NAME')} />
 *       <Field.Tags path='tags' label={t('LABEL.TAGS')} options={options?.tags} />
 *     </Tabs.TabContent>
 *   </Block>
 * </Tabs.Provider>
 */
export function Tabs(props: TabsProps) {
  const { value, children, className, ...otherProps } = useItem(props)
  const _className = cn(css.Tabs, className)
  const tabs = useTabs()

  return (
    <MuiTabs
      className={_className}
      value={tabs?.value ?? value}
      onChange={(_, val) => tabs?.setValue(val)}
      {...otherProps}
    >
      {children}
    </MuiTabs>
  )
}

Tabs.displayName = 'Tabs'

Tabs.Tab = Tab
Tabs.TabContent = TabContent
Tabs.Provider = TabsProvider

export default Tabs
