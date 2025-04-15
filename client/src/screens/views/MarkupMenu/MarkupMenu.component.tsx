import React, { Fragment, useLayoutEffect, useMemo, useState } from 'react'

// ---| core |---
import { t } from 'locale'
import { arr, cn, mix } from 'tools'

// ---| pages |---
// ---| screens |---
import { initMarkup, MarkupOptions, sort } from 'screens/views/MarkupBoard'
// ---| components |---
import Text from 'components/views/Text'
import Popup from 'components/popups/Popup'
import Button from 'components/actions/Button'
import Layout from 'components/layouts/Layout'
import ButtonGroup from 'components/actions/ButtonGroup'
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
 *
 * How to use
 * @example
 * <MarkupMenu />
 */
export function MarkupMenu(props: MarkupMenuProps) {
  const { select, items, onSelect, onSave, className, ...otherProps } = props
  const _className = cn(css.MarkupMenu, className)
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
      delete enabled[markup.width]
    } else {
      enabled[markup.width] = markup
    }

    setEnabled({ ...enabled })
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
    <Block className={_className} v='x' g='xs' aligns='center' {...otherProps}>
      <ButtonGroup
        className={css.MarkupMenuScreens}
        items={sorted?.map(m => {
          const screen = MARKUP_SCREEN_MAP[m.width]

          return {
            start: screen.icon,
            tooltip: { title: t(screen.label), content: <MarkupSpec options={m} /> },
            active: m.width === select?.width,
            onClick: () => onSelect?.(m),
          }
        })}
      />

      <Popup
        title={t('LABEL.SCREENS')}
        actions={o => [
          { content: t('ACTION.SAVE'), start: 'save', size: 'xxs', color: 'success', onClick: () => onSave?.(sort(Object.values(enabled))) },
          { content: t('ACTION.CLOSE'), start: 'close', size: 'xxs', onClick: o.off },
        ]}
        trigger={o => (
          <Button
            active={o.isOn}
            onClick={o.toggle}
            start='settings_slow_motion'
            tooltip={t('ACTION.CHANGE_MARKUP_LIST')}
          />
        )}
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
      </Popup>
    </Block>
  )
}

MarkupMenu.displayName = 'MarkupMenu'

export default MarkupMenu
