import React from 'react'

// ---| core |---
import { TranslateKeys } from 'locale'

// ---| components |---
import { IconVariant } from 'components/views/Icon'

// ---| self |---


/**
 *  Investigations of size screen sizes
 *  - Popular screens:
 *    - https://saitodrom.by/stati/adaptaciya-sajta-pod-mobilnye-ustrojstva/
 *    - https://siteclinic.ru/blog/usability/kak-vybrat-shirinu-sajta/
 *  - Hd screens: https://support.lenovo.com/ru/ru/solutions/ht104457-what-do-hd-hd-and-fhd-mean
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type MarkupScreenWidth = 0 | 576 | 768 | 992 | 1200 | 1366 | 1920 | 2562 | 3840 | 7680 | (number & {})

export class MarkupScreen {
  constructor(
    public width: MarkupScreenWidth,
    public rows: number,
    public columns: number,
    public gap: number,
    public icon: IconVariant,
    public label: TranslateKeys,
  ) { }
}

export const MARKUP_SCREENS = [
  new MarkupScreen(0, 2, 2, 4, 'devices_wearables', 'LABEL.SCREEN.SMALL_SCREENS'),
  new MarkupScreen(576, 4, 4, 4, 'smartphone', 'LABEL.SCREEN.MOBILE'),
  new MarkupScreen(768, 5, 5, 4, 'tablet', 'LABEL.SCREEN.TABLET'),
  new MarkupScreen(992, 6, 6, 4, 'computer', 'LABEL.SCREEN.LAPTOP'),
  new MarkupScreen(1200, 7, 7, 4, 'desktop_windows', 'LABEL.SCREEN.COMPUTER'),
  new MarkupScreen(1366, 8, 8, 4, 'hd', 'LABEL.SCREEN.HD'),
  new MarkupScreen(1920, 10, 10, 4, 'full_hd', 'LABEL.SCREEN.FHD'),
  new MarkupScreen(2562, 12, 12, 8, '2k', 'LABEL.SCREEN.2K'),
  new MarkupScreen(3840, 16, 16, 12, '4k', 'LABEL.SCREEN.4K'),
  new MarkupScreen(7680, 32, 32, 16, '8k', 'LABEL.SCREEN.8K'),
]

export const MARKUP_SCREEN_MAP = MARKUP_SCREENS.reduce(
  (acc, screen) => ({ ...acc, [screen.width]: screen }),
  {} as Record<MarkupScreenWidth, MarkupScreen>,
)
