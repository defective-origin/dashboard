// TODO: tools, feature, web-workers, core, assets/icons/images
// TODO: add description
// TODO: add  init  structure  script
// TODO: add перевести  на  typescript
// TODO:  переместить плоп  конфиг  в темплейты и  разбить  на  файлы
// TODO:  add  ERROR templates
// TODO:  add  subdir prefix
// TODO:  add  generator for component from lib
import Prompt from './plopfile.prompts.js'
import Action from './plopfile.actions.js'
import Tool from './plopfile.tool.js'

// generations
const genComponent = ({
  description,
  postfix,
  defaultName,
  defaultSubpath,
  files = ['component', 'test', 'module'],
  module = {
    notExports: ['test', 'module', 'story'],
    defaultExport: 'component',
  },
}) => ({
  description,
  prompts: Tool.list(
    Prompt.NameInput({ default: defaultName, postfix }),
    Prompt.SubpathInput({ default: defaultSubpath }),
  ),
  actions: Tool.list(
    Action.Folder({
      target: 'src/{{subpath}}/{{pascalCase name}}',
      template: 'templates/Component',
      files,
      module,
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
  plop.setGenerator('Component', genComponent({
    description: 'Create a reusable, pure, unified component',
    defaultName: "Component",
    defaultSubpath: "components",
  }))

  // Create a Screen component.
  // Screen required criteria:
  // - Receive data from props or API
  // - Can use only other Screens and Components inside
  // - Can have any business logic inside
  // - Should have Screen postfix in component name
  // - Spread data between inner Screens and Components
  plop.setGenerator('Screen', genComponent({
    description: 'Create a screen component',
    postfix: 'Screen',
    defaultName: "Screen",
    defaultSubpath: "screens",
  }))

  // Create a Page component.
  // Page required criteria:
  // - Receive data from props or API
  // - Can use only other Pages, Screens and Components inside
  // - Can have any business logic inside
  // - Should have Page postfix in component name
  // - Spread data between inner Pages, Screens and Components
  plop.setGenerator('Page', genComponent({
    description: 'Create a page component',
    postfix: 'Page',
    defaultName: "Page",
    defaultSubpath: "pages",
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
        target: 'src/common/hooks/{{pascalCase name}}',
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

  // // Create a launcher which includes typed contexts.
  // // Launcher required criteria:
  // // - Receive default options from props or default config
  // // - Can receive data from API
  // // - Can use only other Launchers inside
  // // - Should have Launcher postfix in component name
  // // - Spread data between inner components via contexts
  // //
  // // Popular launchers:
  // //  - AppLauncher - All Launchers + AppPage
  // //  - CoreLauncher - providers: [Suspense | HotKeys | Router | Store | Environment]
  // //  - SystemLauncher - providers: [Log | Analytic | ABTesting]
  // //  - AccountLauncher - providers: [User | Setting]
  // //  - UILauncher - providers: [UI + Theme | ModalWindow | SnackBar, locale + dayjs]
  plop.setGenerator('Launcher', genComponent({
    description: 'Create a launcher component',
    postfix: 'Launcher',
    defaultName: "Launcher",
    defaultSubpath: "launchers",
    files: ['component', 'conf', 'stub']
  }))

  plop.setGenerator('Launcher Provider', {
    description: 'Create a Launcher Provider',
    prompts: Tool.list(
      Prompt.NameInput({ default: "Provider", postfix: 'Provider' }),
      Prompt.SubpathInput({ default: "launchers" }),
    ),
    actions: Tool.list(
      Action.Folder({
        target: 'src/{{subpath}}/{{pascalCase name}}',
        template: 'templates/Provider',
        files: ['component', 'context', 'stub', 'test'],
        module: {
          notExports: ['test'],
          defaultExport: 'component',
        },
      }),
    ),
  })

  plop.setGenerator('Locale', {
    description: 'Create a Locale',
    prompts: Tool.list(),
    actions: Tool.list(
      Action.Folder({
        target: 'src/locale',
        template: 'templates/Locale',
        abortOnFail: false,
        files: ['component', 'test', 'tool'],
        module: {
          notExports: ['test', 'tool'],
          defaultExport: 'component',
        },
        data: { name: 'LocaleProvider' },
      }),

      // generate all language map files for translates and locale formatters
      [ 'i18n', 'l10n' ].map((submodule) => [
        Action.ModuleFile({
          type: 'partial',
          target: `src/locale/${submodule}`,
        }),
        [ 'en', 'ru' ].map((language) => Action.File({
          target: `src/locale/${submodule}/${language}.json`,
          template: `templates/Locale/${submodule}/${submodule}.json.hbs`,
          module: {
            target: `src/locale/${submodule}`,
            type: 'partial',
            import: true,
            export: true,
          },
          data: { name: language },
        }))
      ]),
    ),
  })

  plop.setGenerator('Store', {
    description: 'Create a Store',
    prompts: Tool.list(),
    actions: Tool.list(
      Action.Folder({
        target: 'src/store',
        template: 'templates/Store',
        files: ['component', 'selector', 'action', 'mock'],
        module: {
          notExports: [],
          defaultExport: 'component',
        },
      }),
    ),
  })

  plop.setGenerator('Store Slice', {
    description: 'Create a Store Slice',
    prompts: Tool.list(
      Prompt.NameInput({ default: "Slice", postfix: 'Slice' }),
    ),
    actions: Tool.list(
      Action.Folder({
        target: 'src/store/{{pascalCase name}}',
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

  plop.setGenerator('Api', {
    description: 'Create a Api',
    prompts: Tool.list(),
    actions: Tool.list(
      Action.Folder({
        target: 'src/api',
        template: 'templates/Api',
        files: ['request', 'tool', 'component', 'mock'],
        module: {
          notExports: [],
          defaultExport: 'component',
        },
      }),
    ),
  })

  plop.setGenerator('Api Slice', {
    description: 'Create a Api Slice',
    prompts: Tool.list(
      Prompt.NameInput({ default: "Api", postfix: 'Api' }),
    ),
    actions: Tool.list(
      Action.Folder({
        target: 'src/api/{{pascalCase name}}',
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
