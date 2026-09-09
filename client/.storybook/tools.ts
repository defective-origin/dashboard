import type { ArgTypes } from '@storybook/react'
import { toVar } from '../src/theme'

export const tableDocs = (summary?: string, defaultSummary?: string) => ({
  type: {
    summary,
  },
  defaultValue: defaultSummary ? {
    summary: defaultSummary,
  } : undefined,
})

// fields
export const string = (summary: string = 'string', defaultSummary?: string): ArgTypes[string] => ({
  type: 'string',
  table: tableDocs(summary, defaultSummary),
})

export const boolean = (defaultSummary?: string): ArgTypes[string] => ({
  type: 'boolean',
  control: 'boolean',
  table: tableDocs('boolean', defaultSummary),
})

export const number = (summary = 'number', defaultSummary?: string): ArgTypes[string] => ({
  type: 'number',
  table: tableDocs(summary, defaultSummary),
})

export const css = (defaultSummary?: string): ArgTypes[string] => ({
  control: 'object',
  table: tableDocs('CSSProperties', defaultSummary),
})

export const element = (defaultSummary?: string): ArgTypes[string] => ({
  control: 'object',
  table: tableDocs('ElementOptions<HTMLElement>', defaultSummary),
})

export const object = (summary?: string, defaultSummary?: string): ArgTypes[string] => ({
  control: 'object',
  table: tableDocs(summary, defaultSummary),
})

export const variants = (items: unknown[], summary: string, defaultSummary?: string): ArgTypes[string] => ({
  options: items,
  type: typeof items[0] as 'string',
  control: {
    type: 'select',
  },
  table: tableDocs(summary, defaultSummary),
})

export const reactNode = (withContent?: boolean): ArgTypes[string] => ({
  type: 'string',
  table: tableDocs('ReactNode', withContent ? 'content' : undefined),
})

export const list = (summary: string): ArgTypes[string] => ({
  control: 'object',
  table: tableDocs(`${summary}[]`),
})

export const func = (summary = 'function'): ArgTypes[string] => ({
  control: 'object',
  table: tableDocs(summary),
})

export const event = (summary = '(e) => void'): ArgTypes[string] => func(summary)


export const field = {
  variants,
  string,
  number,
  css,
  list,
  boolean,
  reactNode,
  element,
  object,
  event,
  func,
}

// params

export const docsWithVariants = (name: string, variants: unknown[] = [], defaultVariant?: unknown) => ({
  description: {
    story: [
      `__${name}__ variants: ${variants.filter(Boolean)?.map((v) => `\`${v}\``).join(' ') ?? ''}.`,
      defaultVariant && `Default value: \`${defaultVariant}\`.`,
    ].join(' '),
  },
})

export const docs = (text: string) => ({
  description: {
    story: text.split(' ').length > 1 ? text : `The Demo variant of the ${text} component.`,
  },
})

export const params = (name: string, variants?: unknown[], defaultVariant?: unknown) => ({
  docs: Array.isArray(variants) ? docsWithVariants(name, variants, defaultVariant) : docs(name),
})


export const SB_CSS = {
  margin: toVar('sb-margin-color'),
  space: toVar('sb-space-color'),
  border: toVar('sb-border'),
  item: toVar('sb-item-color'),
}
