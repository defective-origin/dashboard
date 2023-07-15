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
  const filteredPrompts = Object.keys(prompts).reduce((acc, prompt) => {
    // remove fields from input if we pass value via data
    if (!(prompt.name in data)) {
      acc.push(prompt)
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
} = {}) => ({
  description,
  prompts: Tool.list(
    !data?.name && Prompt.NameInput({ default: defaultName, postfix: postfixName }),
    !data?.subpath && Prompt.SubpathInput({ default: defaultSubpath }),
  ),
  actions: Tool.list(
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Component',
      files,
      module,
      data,
      isSubmodule,
    }),
  ),
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
} = {}) => ({
  description,
  prompts: Tool.list(
    !data?.name && Prompt.NameInput({ default: defaultName, postfix: postfixName }),
    !data?.subpath && Prompt.SubpathInput({ default: defaultSubpath }),
  ),
  actions: Tool.list(
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Context',
      files,
      module,
      data,
      isSubmodule,
    }),
  ),
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
} = {}) => ({
  description,
  prompts: Tool.list(
    !data?.name && Prompt.NameInput({ prefix: 'use', default: defaultName, postfix: postfixName }),
    !data?.subpath && Prompt.SubpathInput({ default: defaultSubpath }),
  ),
  actions: Tool.list(
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Hook',
      files,
      module,
      data,
      isSubmodule,
    }),
  ),
})

export const Store = ({
  files = ['component', 'selector', 'action', 'mock'],
  module = {
    notExports: [],
    defaultExport: 'component',
  },
} = {}) => ({
  description: 'Init Store config folder',
  prompts: Tool.list(),
  actions: Tool.list(
    Action.Folder({
      target: 'store',
      template: 'templates/Store',
      files,
      module,
    }),
  ),
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
} = {}) => ({
  description,
  prompts: Tool.list(
    !data?.name && Prompt.NameInput({ default: defaultName, postfix: postfixName }),
    !data?.subpath && Prompt.SubpathInput({ default: defaultSubpath }),
  ),
  actions: Tool.list(
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Store/StoreSlice',
      files,
      module,
      data,
      isSubmodule,
    }),
  ),
})

export const Api = ({
  files = ['request', 'tool', 'component', 'mock'],
  module = {
    notExports: [],
    defaultExport: 'component',
  },
} = {}) => ({
  description: 'Init Api config folder',
  prompts: Tool.list(),
  actions: Tool.list(
    Action.Folder({
      target: 'api',
      template: 'templates/Api',
      files,
      module,
    }),
  ),
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
} = {}) => ({
  description,
  prompts: Tool.list(
    !data?.name && Prompt.NameInput({ default: defaultName, postfix: postfixName }),
    !data?.subpath && Prompt.SubpathInput({ default: defaultSubpath }),
  ),
  actions: Tool.list(
    Action.Folder({
      target: '{{subpath}}/{{pascalCase name}}',
      template: 'templates/Api/ApiSlice',
      files,
      module,
      data,
      isSubmodule,
    }),
  ),
})

export const Language = ({
  description = 'Create Language format and translate maps',
  language = 'en',
} = {}) => ({
  description,
  prompts: Tool.list(),
  actions: Tool.list(
    [ 'i18n', 'l10n' ].map((submodule) => [
      Action.ModuleFile({
        type: 'partial',
        target: `locale2/${submodule}`,
      }),
      Action.File({
        target: `locale2/${submodule}/${language}.json`,
        template: `templates/Locale/${submodule}/${submodule}.json.hbs`,
        module: {
          target: `locale2/${submodule}`,
          type: 'partial',
          import: true,
          export: true,
        },
        data: { name: language },
      }),
    ]),
  ),
})

export const Locale = ({
  description = 'Init Locale config folder with default translate and format maps',
  files = ['conf', 'test', 'tool'],
  module = {
    notExports: ['test'],
    defaultExport: ['conf'],
  },
} = {}) => ({
  description,
  prompts: Tool.list(),
  actions: Tool.list(
    Action.Folder({
      target: 'locale2',
      template: 'templates/Locale',
      files,
      module,
    }),
    Language().actions,
  ),
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
