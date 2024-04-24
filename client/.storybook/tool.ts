import type { InputType } from '@storybook/types'

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

export const boolean = (summary: unknown = 'boolean', defaultSummary?: unknown): InputType => ({
  type: 'boolean',
  control: 'boolean',
  table: tableDocs(summary, defaultSummary),
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


export const field = {
  variants,
  string,
  number,
  css,
  boolean,
  reactNode,
  element,
  object,
}

// params

export const docsWithVariants = (name: string, variants: unknown[] = [], defaultVariant?: unknown) => ({
  description: {
    story: [
      `__${name}__ variants: ${variants.filter(Boolean)?.map((v) => `\`${v}\``) ?? ''}.`,
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
