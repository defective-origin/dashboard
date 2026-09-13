import actions from './generator.actions.js'
import prompts from './generator.prompts.js'

export const Item = ({
  description,
  prompts = [],
  actions = [],
  data = {},
} = {}) => ({
  data,
  description,
  prompts,
  actions: actions.flat(Infinity).filter(Boolean),
})

export const Component = (info, {
  description,
  namePostfix,
  defaultPath,
  withStories,
  tests, // 'unit' | 'e2e'
} = {}) => Item({
  description,
  prompts: [
    prompts.Name({ default: 'Component', postfix: namePostfix, info }),
    prompts.Path({ default: defaultPath }),
    prompts.Confirm({ name: 'isLazy', message: 'Should be lazy loadable?' }),
  ],
  actions: [
    actions.Folder({
      target: '{{path}}/{{pascalCase name}}',
      template: 'Component',
      ignore: [!withStories && 'stories', tests === 'e2e' ? 'test' : 'e2e'],
    }),
  ],
})


export const Hook = info => Item({
  description: 'Create a reusable, pure, unified react hook',
  prompts: [
    prompts.Name({ default: 'Hook', info }),
    prompts.Path(),
  ],
  actions: [
    actions.Folder({
      target: 'hooks/{{path}}/Use{{pascalCase name}}',
      template: 'Hook',
      isExported: true,
    }),
  ],
})


export const Tool = info => Item({
  description: 'Create a reusable, pure, unified react tool',
  prompts: [
    prompts.Name({ default: 'Tools', info }),
    prompts.Path(),
  ],
  actions: [
    actions.Folder({
      target: 'tools/{{path}}/{{pascalCase name}}',
      template: 'Tool',
      isExported: true,
    }),
  ],
})

export const Api = info => Item({
  description: 'Create Api endpoint',
  prompts: [
    prompts.Name({ default: 'Endpoint', info }),
    prompts.Path(),
  ],
  actions: [
    actions.File({
      target: 'api/{{path}}/{{pascalCase name}}.endpoint.ts',
      template: 'Api/api.endpoint.ts.hbs',
      isExported: true,
    }),
  ],
})

export const Locale = info => Item({
  description: 'Create locale language format and translate maps',
  prompts: [
    prompts.Name({ default: 'en', info }),
  ],
  actions: [
    [ 'i18n', 'l10n' ].map(type => [
      actions.File({
        target: `locale/${type}/{{dashCase name}}.json`,
        template: `Locale/${type}.json.hbs`,
        isExported: true,
      }),
    ]),
  ],
})

export default {
  Component,
  Hook,
  Tool,
  Api,
  Locale,
}
