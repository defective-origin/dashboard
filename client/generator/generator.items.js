import Prompt from './generator.prompts.js'
import Action from './generator.actions.js'
import Tool from './generator.tool.js'

const ITEM_PROMPT_MAP = {
  name: Prompt.NameInput,
  subpath: Prompt.SubpathInput,
}

export const Item = ({
  description,
  prompts = {},
  actions = [],
  data = {},
} = {}) => {
  const filteredPrompts = Object.keys(prompts).reduce((acc, name) => {
    // remove fields from input if we pass value via data
    if (!(name in data)) {
      const prompt = ITEM_PROMPT_MAP[name]
      const options = prompts[name]

      acc.push(prompt(options))
    }

    return acc
  }, [])
  const filteredActions = actions
    // add possibility to have nested items
    .map((action) => action?.actions ? action.actions : action)

  return {
    description,
    prompts: Tool.list(filteredPrompts),
    actions: Tool.list(filteredActions),
  }
}

export const Component = ({
  description = 'Create a reusable, pure, unified component',
  postfixName,
  defaultName = 'Component',
  defaultSubpath = 'components',
  files = ['component', 'test', 'module'],
  module = {
    notExports: ['test', 'module', 'story'],
    defaultExport: 'component',
  },
  data,
  isSubmodule,
} = {}) => Item({
  description,
  prompts: {
    name: { default: defaultName, postfix: postfixName },
    subpath: { default: defaultSubpath },
  },
  actions: [
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Component',
      files,
      module,
      data,
      isSubmodule,
    }),
  ],
  data,
})

export const Context = ({
  description = 'Create a Context',
  postfixName = 'Context',
  defaultName = 'Name',
  defaultSubpath = 'Launcher',
  files = ['component', 'conf', 'context', 'stub', 'test'],
  module = {
    notExports: ['test'],
    defaultExport: 'component',
  },
  data,
  isSubmodule = true,
} = {}) => Item({
  description,
  prompts: {
    name: { default: defaultName, postfix: postfixName },
    subpath: { default: defaultSubpath },
  },
  actions: [
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Context',
      files,
      module,
      data,
      isSubmodule,
    }),
    data,
  ],
})

export const Hook = ({
  description = 'Create a reusable, pure, unified react hook',
  postfixName,
  defaultName = 'Hook',
  defaultSubpath = 'common/hooks',
  files = ['hook', 'test'],
  module = {
    notExports: ['test'],
    defaultExport: 'hook',
  },
  data,
  isSubmodule = true,
} = {}) => Item({
  description,
  prompts: {
    name: { prefix: 'use', default: defaultName, postfix: postfixName },
    subpath: { default: defaultSubpath },
  },
  actions: [
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Hook',
      files,
      module,
      data,
      isSubmodule,
    }),
  ],
})

export const Store = ({
  files = ['component', 'selector', 'action', 'mock'],
  module = {
    notExports: [],
    defaultExport: 'component',
  },
} = {}) => Item({
  description: 'Init Store config folder',
  actions: [
    Action.Folder({
      target: 'store',
      template: 'templates/Store',
      files,
      module,
    }),
  ],
})

export const StoreSlice = ({
  description = 'Create a Store Slice',
  postfixName = 'Slice',
  defaultName = 'Name',
  defaultSubpath = 'store',
  files = ['store', 'selector', 'action', 'mock', 'test'],
  module = {
    notExports: ['test'],
    defaultExport: 'hook',
  },
  data,
  isSubmodule = true,
} = {}) => Item({
  description,
  prompts: {
    name: { default: defaultName, postfix: postfixName },
    subpath: { default: defaultSubpath },
  },
  actions: [
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Store/StoreSlice',
      files,
      module,
      data,
      isSubmodule,
    }),
  ],
  data,
})

export const Api = ({
  files = ['request', 'tool', 'component', 'mock'],
  module = {
    notExports: [],
    defaultExport: 'component',
  },
} = {}) => Item({
  description: 'Init Api config folder',
  actions: [
    Action.Folder({
      target: 'api',
      template: 'templates/Api',
      files,
      module,
    }),
  ],
})

export const ApiSlice = ({
  description = 'Create a Api Slice',
  postfixName = 'Slice',
  defaultName = 'Name',
  defaultSubpath = 'api',
  files = ['request', 'tool', 'schema', 'mock'],
  module = {
    notExports: [],
    defaultExport: 'request',
  },
  data,
  isSubmodule = true,
} = {}) => Item({
  description,
  prompts: {
    name: { default: defaultName, postfix: postfixName },
    subpath: { default: defaultSubpath },
  },
  actions: [
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Api/ApiSlice',
      files,
      module,
      data,
      isSubmodule,
    }),
  ],
  data,
})

export const Language = ({
  description = 'Create Language format and translate maps',
  defaultName = 'en',
} = {}) => Item({
  description,
  prompts: {
    name: { default: defaultName },
  },
  actions: [
    [ 'i18n', 'l10n' ].map((submodule) => [
      Action.ModuleFile({
        type: 'partial',
        target: `locale/${submodule}`,
      }),
      Action.File({
        target: `locale/${submodule}/{{snakeCase name}}.json`,
        template: `templates/Locale/${submodule}/${submodule}.json.hbs`,
        module: {
          target: `locale/${submodule}`,
          type: 'partial',
          import: true,
          export: true,
        },
      }),
    ]),
  ],
})

export const Locale = ({
  description = 'Init Locale config folder with default translate and format maps',
  files = ['conf', 'test', 'tool'],
  module = {
    notExports: ['test'],
    defaultExport: ['conf'],
  },
} = {}) => Item({
  description,
  prompts: {
    name: { default: 'en' },
  },
  actions: [
    Action.Folder({
      target: 'locale',
      template: 'templates/Locale',
      files,
      module,
    }),
    Language(),
  ],
})


export const Launcher = ({
  description = 'Create Launcher Component',
  files = ['component', 'conf', 'stub'],
  data = {
    subpath: './',
    name: 'Launcher',
  },
} = {}) => Component({ description, files, data })


export default {
  Component,
  Context,
  Hook,
  Store,
  StoreSlice,
  Api,
  ApiSlice,
  Locale,
  Language,
  Launcher,
}
