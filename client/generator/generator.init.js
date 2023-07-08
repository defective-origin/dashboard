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

  plop.setGenerator('Init Launcher', ComponentGenerator({
    description: 'Create Launcher Component',
    files: ['component', 'conf', 'stub'],
    data: {
      subpath: './',
      name: 'Launcher',
    },
  }))

  plop.setGenerator('Init Locale', {
    description: 'Create a Locale config with translate maps',
    prompts: Tool.list(),
    actions: Tool.list(
      Action.Folder({
        target: 'locale',
        template: 'templates/Locale',
        files: ['conf', 'test', 'tool'],
        module: {
          notExports: ['test'],
          defaultExport: ['conf'],
        },
        data: { name: 'LocaleProvider' },
      }),

      // generate all language map files for translates and locale formatters
      [ 'i18n', 'l10n' ].map((submodule) => [
        Action.ModuleFile({
          type: 'partial',
          target: `locale/${submodule}`,
        }),
        [ 'en', 'ru' ].map((language) => Action.File({
          target: `locale/${submodule}/${language}.json`,
          template: `templates/Locale/${submodule}/${submodule}.json.hbs`,
          module: {
            target: `locale/${submodule}`,
            type: 'partial',
            import: true,
            export: true,
          },
          data: { name: language },
        })),
      ]),
    ),
  })

  plop.setGenerator('Init Store', {
    description: 'Create a Store',
    prompts: Tool.list(),
    actions: Tool.list(
      Action.Folder({
        target: 'store',
        template: 'templates/Store',
        files: ['component', 'selector', 'action', 'mock'],
        module: {
          notExports: [],
          defaultExport: 'component',
        },
      }),
    ),
  })

  plop.setGenerator('Init Api', {
    description: 'Create a Api',
    prompts: Tool.list(),
    actions: Tool.list(
      Action.Folder({
        target: 'api',
        template: 'templates/Api',
        files: ['request', 'tool', 'component', 'mock'],
        module: {
          notExports: [],
          defaultExport: 'component',
        },
      }),
    ),
  })
}
