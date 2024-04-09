import type { InputType } from '@storybook/types'

// fields
export const string = (): InputType => ({
  type: 'string',
})

export const boolean = (): InputType => ({
  type: 'boolean',
  control: 'boolean'
})

export const number = (defaultSummary?: unknown): InputType => ({
  type: 'number',
  table: {
    type: {
      summary: defaultSummary,
    },
  },
})

export const css = (): InputType => ({
  control: 'object',
  table: {
    type: {
      summary: 'CSSProperties',
    },
  },
})

export const variants = (items: unknown[], summary: unknown, defaultSummary?: unknown): InputType => ({
  options: items,
  type: typeof items[0] as 'string',
  control: {
    type: 'select',
  },
  table: {
    type: {
      summary,
    },
    defaultValue: {
      summary: defaultSummary,
    },
  },
})

export const reactNode = (withContent?: boolean): InputType => ({
  type: 'string',
  table: {
    type: {
      summary: 'ReactNode',
    },
    defaultValue: withContent ? {
      summary: 'content',
    } : undefined,
  },
})


export const field = {
  variants,
  string,
  number,
  css,
  boolean,
  reactNode,
}

// params

export const docsWithVariants = (name: string, variants: unknown[] = []) => ({
  description: {
    story: `__${name}__ variants: ${variants.filter(Boolean)?.map((v) => `\`${v}\``) ?? ''}`,
  },
})

export const docs = (name: string) => ({
  description: {
    story: `The Demo variant of the ${name} component.`,
  },
})

export const params = (name: string, variants?: unknown[]) => ({
  docs: Array.isArray(variants) ? docsWithVariants(name, variants) : docs(name),
})
