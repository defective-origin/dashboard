// TODO: tools, feature, web-workers, core, assets/icons/images
// TODO: add description
// TODO: add  init  structure  script
// TODO: add перевести  на  typescript
// TODO:  add  ERROR templates
// TODO:  add  subdir prefix
import Prompt from './generator.prompts.js'
import Action from './generator.actions.js'
import Tool from './generator.tool.js'

// generations
const ComponentGenerator = ({
  description,
  postfixName,
  defaultName,
  defaultSubpath,
  files = ['component', 'test', 'module'],
  module = {
    notExports: ['test', 'module', 'story'],
    defaultExport: 'component',
  },
  data,
  isSubmodule,
}) => ({
  description,
  prompts: Tool.list(
    (postfixName || defaultName) && Prompt.NameInput({ default: defaultName, postfix: postfixName }),
    defaultSubpath && Prompt.SubpathInput({ default: defaultSubpath }),
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

export default function (plop) {
  plop.setWelcomeMessage([
    'React app infrastructure creator.',
    'Allows to initialize the application infrastructure or create parts of it.',
  ].join(' '))

  // Create a reusable, pure, unified Component.
  // Component required criteria:
  // - Receive all data only from props
  // - Can use only other Components inside
  // - Must not have any business logic inside
  // - Doesn`t have any postfix in component name
  plop.setGenerator('Component', ComponentGenerator({
    description: 'Create a reusable, pure, unified component',
    defaultName: 'Component',
    defaultSubpath: 'components',
  }))
  plop.setGenerator('Library Component Override', ComponentGenerator({
    description: 'Create a reusable, pure, unified component',
    defaultName: 'Component',
    defaultSubpath: 'components/lib',
  }))

  // Create a Screen component.
  // Screen required criteria:
  // - Receive data from props or API
  // - Can use only other Screens and Components inside
  // - Can have any business logic inside
  // - Should have Screen postfix in component name
  // - Spread data between inner Screens and Components
  plop.setGenerator('Screen', ComponentGenerator({
    description: 'Create a screen component',
    postfixName: 'Screen',
    defaultSubpath: 'screens',
  }))

  // Create a Page component.
  // Page required criteria:
  // - Receive data from props or API
  // - Can use only other Pages, Screens and Components inside
  // - Can have any business logic inside
  // - Should have Page postfix in component name
  // - Spread data between inner Pages, Screens and Components
  plop.setGenerator('Page', ComponentGenerator({
    description: 'Create a page component',
    postfixName: 'Page',
    defaultSubpath: 'pages',
  }))

  // Create a reusable, pure, unified Hook.
  // Hook required criteria:
  // - Receive all data only from options
  // - Must not have any business logic inside
  // - Doesn`t have any postfix in hook name
  plop.setGenerator('Hook', {
    description: 'Create a reusable, pure, unified react hook',
    prompts: Tool.list(
      Prompt.NameInput({ prefix: 'use' }),
    ),
    actions: Tool.list(
      Action.Folder({
        target: 'common/hooks/{{pascalCase name}}',
        template: 'templates/Hook',
        files: ['hook', 'test'],
        module: {
          notExports: ['test'],
          defaultExport: 'hook',
        },
        isSubmodule: true,
      }),
    ),
  })

  // Create a launcher which includes typed contexts.
  // Launcher required criteria:
  // - Receive default options from props or default config
  // - Can receive data from API
  // - Can use only other Launchers inside
  // - Should have Launcher postfix in component name
  // - Spread data between inner components via contexts
  plop.setGenerator('Context', {
    description: 'Create a Context',
    prompts: Tool.list(
      Prompt.NameInput({ postfix: 'Context' }),
      Prompt.SubpathInput({ default: 'Launcher' }),
    ),
    actions: Tool.list(
      Action.Folder({
        target: '{{subpath}}/{{pascalCase name}}',
        template: 'templates/Context',
        files: ['component', 'conf', 'context', 'stub', 'test'],
        module: {
          notExports: ['test'],
          defaultExport: 'component',
        },
        isSubmodule: true,
      }),
    ),
  })

  plop.setGenerator('Store Slice', {
    description: 'Create a Store Slice',
    prompts: Tool.list(
      Prompt.NameInput({ default: 'Slice', postfix: 'Slice' }),
    ),
    actions: Tool.list(
      Action.Folder({
        target: 'store/{{pascalCase name}}',
        template: 'templates/Store/StoreSlice',
        moduleType: 'common',
        files: ['store', 'selector', 'action', 'mock', 'test'],
        module: {
          notExports: ['test'],
          defaultExport: 'store',
        },
        isSubmodule: true,
      }),
    ),
  })

  plop.setGenerator('Api Slice', {
    description: 'Create a Api Slice',
    prompts: Tool.list(
      Prompt.NameInput({ default: 'Api', postfix: 'Api' }),
    ),
    actions: Tool.list(
      Action.Folder({
        target: 'api/{{pascalCase name}}',
        template: 'templates/Api/ApiSlice',
        files: ['request', 'tool', 'schema', 'mock'],
        module: {
          notExports: [],
          defaultExport: 'request',
        },
        isSubmodule: true,
      }),
    ),
  })
}