import React from 'react'

// ---| core |---
import { emitEvent, useEvent } from 'hooks'

// ---| components |---

// ---| self |---


export type MarkupLineVariant = 'row' | 'column'
export type MarkupLineOptions = {
  v: MarkupLineVariant
  index: number
  size: string
}

export type MarkupLineActionPayload = {
  highlight?: boolean
  reset?: boolean
}

export const emitMarkupLineAction = (v: MarkupLineVariant, index?: number, detail = {}) => {
  typeof index === 'number' && emitEvent<MarkupLineActionPayload>(['markup', v, index], detail)
}


export const markupLineManager = {
  highlight: (v: MarkupLineVariant, index?: number) => emitMarkupLineAction(v, index, { highlight: true }),
  reset: (v: MarkupLineVariant, index?: number) => emitMarkupLineAction(v, index, { reset: true }),
}


export const useMarkupLineAction = <D extends object>(v: MarkupLineVariant, index?: number, listener?: (detail: D) => void) =>
  useEvent(
    ['markup', v, index],
    e => listener?.((e as CustomEvent<D>).detail),
    { disable: typeof index !== 'number' },
  )
