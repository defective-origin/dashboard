import type { InputType } from '@storybook/types'
import { toVariable } from '../src/theme'

export const tableDocs = (summary: unknown, defaultSummary?: unknown) => ({
  type: {
    summary,
  },
  defaultValue: defaultSummary ? {
    summary: defaultSummary,
  } : undefined,
})

// fields
export const string = (summary: unknown = 'string', defaultSummary?: unknown): InputType => ({
  type: 'string',
  table: tableDocs(summary, defaultSummary),
})

export const boolean = (defaultSummary?: unknown): InputType => ({
  type: 'boolean',
  control: 'boolean',
  table: tableDocs('boolean', defaultSummary),
})

export const number = (summary: unknown = 'number', defaultSummary?: unknown): InputType => ({
  type: 'number',
  table: tableDocs(summary, defaultSummary),
})

export const css = (defaultSummary?: unknown): InputType => ({
  control: 'object',
  table: tableDocs('CSSProperties', defaultSummary),
})

export const element = (defaultSummary?: unknown): InputType => ({
  control: 'object',
  table: tableDocs('ElementOptions<HTMLElement>', defaultSummary),
})

export const object = (summary?: unknown, defaultSummary?: unknown): InputType => ({
  control: 'object',
  table: tableDocs(summary, defaultSummary),
})

export const variants = (items: unknown[], summary: unknown, defaultSummary?: unknown): InputType => ({
  options: items,
  type: typeof items[0] as 'string',
  control: {
    type: 'select',
  },
  table: tableDocs(summary, defaultSummary),
})

export const reactNode = (withContent?: boolean): InputType => ({
  type: 'string',
  table: tableDocs('ReactNode', withContent ? 'content' : undefined),
})

export const list = (summary: unknown): InputType => ({
  control: 'object',
  table: tableDocs(`${summary}[]`),
})

export const func = (summary: unknown = 'function'): InputType => ({
  control: 'object',
  table: tableDocs(summary),
})

export const event = (summary: unknown = '(e) => void'): InputType => func(summary)


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
  margin: toVariable('sb-margin-color'),
  space: toVariable('sb-space-color'),
  border: toVariable('sb-border'),
  item: toVariable('sb-item-color'),
}
