import React, { Fragment, useLayoutEffect, useMemo, useState } from 'react'

// ---| core |---
import { t } from 'locale'
import { arr, cn, mix } from 'tools'

// ---| pages |---
// ---| screens |---
import { initMarkup, MarkupOptions, sort } from 'screens/views/MarkupBoard'
// ---| components |---
import Text from 'components/views/Text'
import Button from 'components/actions/Button'
import Layout from 'components/layouts/Layout'
import Actions from 'components/layouts/Actions'
import Dropdown from 'components/actions/Dropdown'
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './MarkupMenu.module.scss'
import MarkupSpec from './Markup/MarkupSpec'
import Markup, { MARKUP_SCREEN_MAP, MARKUP_SCREENS } from './Markup'

export type MarkupMenuProps = BlockProps & {
  select?: MarkupOptions
  items?: MarkupOptions[]
  onSelect?: (item: MarkupOptions) => void
  onSave?: (items: MarkupOptions[]) => void
}

/**
 * Component description.
 * @example
 * <MarkupMenu />
 */
export function MarkupMenu(props: MarkupMenuProps) {
  const { select, items, onSelect, onSave, className, ...otherProps } = props
  const [enabled, setEnabled] = useState<Record<number, MarkupOptions>>({})
  const sorted = useMemo(() => sort(items), [items])
  const markups = useMemo(() => {
    // TODO: adopt to nearest item [reduce[columns], extend[columns], align[columns]]
    return MARKUP_SCREENS.map(bp => {
      if (!sorted.length) {
        return initMarkup(bp.width, bp.rows, bp.columns, bp.gap)
      }
      // TODO: should take only markups with max items
      const nearest = arr.nearest(sorted, bp.width, item => item.width) ?? initMarkup(bp.width, bp.rows, bp.columns, bp.gap)

      return { ...nearest, width: bp.width }
    })
  }, [sorted])

  // TODO: show remove notification if markup has items
  // TODO: forbid to remove laptop markup
  const toggle = (markup: MarkupOptions) => {
    if (enabled[markup.width]) {
      setEnabled(({ [markup.width]: _, ...rest }) => rest)
    } else {
      setEnabled(curr => ({ ...curr, [markup.width]: markup }))
    }
  }

  useLayoutEffect(() => {
    if (!sorted?.length) {
      return
    }

    // select largest markup if markup is not selected
    if (!select) {
      // TODO: take laptop nearest screen
      onSelect?.(sorted.at(-1) as MarkupOptions)

    // set markup config
    } else {
      setEnabled(mix.arrToObj(sorted, item => item.width))
    }
  }, [select, sorted, onSelect])

  return (
    <Block className={cn(css.MarkupMenu, className)} v='x' g='xs' aligns='center' {...otherProps}>
      <Actions className={css.MarkupMenuScreens} size='xs' group>
        {sorted?.map(m => {
          const screen = MARKUP_SCREEN_MAP[m.width]

          return (
            <Actions.Button
              start={screen.icon}
              tooltip={{ title: t(screen.label), content: <MarkupSpec options={m} /> }}
              active={m.width === select?.width}
              onClick={() => onSelect?.(m)}
            />
          )
        })}
      </Actions>

      <Dropdown
        arrow
        start='settings_slow_motion'
        tooltip={t('ACTION.CHANGE_MARKUP_LIST')}
        title={t('LABEL.SCREENS')}
        actions={o => [
          <Button content={t('ACTION.SAVE')} start='save' color='success' onClick={() => onSave?.(sort(Object.values(enabled)))} />,
          <Button content={t('ACTION.CLOSE')} start='close' onClick={o.off} />,
        ]}
        disableHoverListener
      >
        <Layout className={css.MarkupMenuList} columns='auto 1fr auto' justifies='center' aligns='center'>
          {markups.map(markup => (
            <Fragment key={markup.width}>
              <Markup tooltipSide='left' options={markup} />
              <Text size='xxs' content={`> ${markup.width}`} />
              {enabled[markup.width] && <Button size='xs' start='remove' color='error' onClick={() => toggle(markup)} disabled={markup.width === 992} />}
              {!enabled[markup.width] && <Button size='xs' start='add' color='success' onClick={() => toggle(markup)} />}
            </Fragment>
          ))}
        </Layout>
      </Dropdown>
    </Block>
  )
}

MarkupMenu.displayName = 'MarkupMenu'

export default MarkupMenu
