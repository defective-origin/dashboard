// ---| self |---
import './TextWrapUI.module.scss'

export const TextWrapWhiteSpaceMap = {
  nowrap: 'tw-ws-nw',
  pre: 'tw-ws-p',
  'pre-wrap': 'tw-ws-pw',
  'pre-line': 'tw-ws-pl',
  'break-spaces': 'tw-ws-bs',
}

export type TextWrapWhiteSpaceTypes = keyof typeof TextWrapWhiteSpaceMap

export const TextWrapWrapMap = {
  anywhere: 'tw-ow-aw',
  'break-word': 'tw-ow-bw',
}

export type TextWrapWrapTypes = keyof typeof TextWrapWrapMap

export const TextWrapBreakMap = {
  'break-all': 'tw-wb-ba',
  'keep-all': 'tw-wb-ka',
  'break-word': 'tw-wb-bw',
}

export type TextWrapBreakTypes = keyof typeof TextWrapBreakMap

export const TextWrapHyphenMap = {
  manual: 'tw-h-m',
  auto: 'tw-h-a',
}

export type TextWrapHyphenTypes = keyof typeof TextWrapHyphenMap
