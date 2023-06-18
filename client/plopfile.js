// TODO: tools, feature, web-workers, core, assets/icons/images
// TODO: add description
// TODO: add  init  structure  script
// TODO: add перевести  на  typescript
// TODO:  переместить плоп  конфиг  в темплейты и  разбить  на  файлы

// Prompts
const prompts = (...args) => args.filter(Boolean)
const InputPrompt = (options = {}) => ({
  message: `Enter ${options.name}`,
  type: 'input',
  ...options
})
const StringInputPrompt = (options = {}) => InputPrompt({
  ...options,
  filter: (input) => {
    const filteredInput = [
      options.prefix ?? '',
      input ?? '',
      options.postfix ?? '',
    ].join('')
    
    return options.filter?.(filteredInput) ?? filteredInput
  },
})

const NameInputPrompt = (options = {}) => StringInputPrompt({ name: 'name', ...options })
const SubpathInputPrompt = (options = {}) => StringInputPrompt({ name: 'subpath', ...options })

// Actions
const actions = (...args) => args.flat().filter(Boolean)

const addFolderAction = (templateFiles, destination) => ({
  type: 'addMany',
  skipIfExists: true,
  templateFiles,
  destination,
  base: templateFiles.slice(0, templateFiles.lastIndexOf('/')),
})
const addFileAction = (path, templateFile) => ({
  type: 'add',
  path,
  templateFile,
  skipIfExists: true,
})
const addModuleFileAction = (path, isSplitModule = false) =>
  addFileAction(
    path,
    isSplitModule ? 'templates/split-module.index.ts.hbs' : 'templates/module.index.ts.hbs',
  )
const injectAction = (place, path, template) => ({
  type: 'append',
  path,
  pattern: `/* INJECT_${place}_PLACE */`,
  template,
})
const injectFileExportAction = (path, template) => injectAction('EXPORT', path, template)
const injectFileImportAction = (path, template) => injectAction('IMPORT', path, template)
const injectModuleImportAction = (path, template, isSplitModule = false) =>
  actions(
    addModuleFileAction(path, isSplitModule),
    injectFileImportAction(path, template),
  )
const injectModuleExportAction = (path, template, isSplitModule = false) =>
  actions(
    addModuleFileAction(path, isSplitModule),
    injectFileExportAction(path, template),
  )
const injectModuleImportExportAction = (path, importTemplate, exportTemplate, isSplitModule = false) =>
  actions(
    addModuleFileAction(path, isSplitModule),
    injectFileImportAction(path, importTemplate),
    injectFileExportAction(path, exportTemplate),
  )

// generations
const genComponent = ({
  description,
  postfix,
  defaultName,
  defaultSubpath
}) => ({
  description,
  prompts: prompts(
    NameInputPrompt({ default: defaultName, postfix }),
    SubpathInputPrompt({ default: defaultSubpath }),
  ),
  actions: actions(
    addFolderAction(
      'templates/Component/*.hbs',
      'src/{{subpath}}/{{pascalCase name}}',
    ),
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
    prompts: prompts(
      NameInputPrompt({ prefix: 'use' }),
    ),
    actions: actions(
      addFolderAction(
        'templates/Hook/*.hbs',
        'src/common/hooks/{{pascalCase name}}',
      ),
      injectModuleExportAction(
        'src/common/hooks/index.ts',
        `export * from './{{pascalCase name}}'`,
      ),
    ),
  })

  // Create a launcher which includes typed contexts.
  // Launcher required criteria:
  // - Receive default options from props or default config
  // - Can receive data from API
  // - Can use only other Launchers inside
  // - Should have Launcher postfix in component name
  // - Spread data between inner components via contexts
  //
  // Popular launchers:
  //  - AppLauncher - All Launchers + AppPage
  //  - CoreLauncher - providers: [Suspense | HotKeys | Router | Store | Environment]
  //  - SystemLauncher - providers: [Log | Analytic | ABTesting]
  //  - AccountLauncher - providers: [User | Setting]
  //  - UILauncher - providers: [UI + Theme | ModalWindow | SnackBar, locale + dayjs]
  plop.setGenerator('Launcher', genComponent({
    description: 'Create a launcher component',
    postfix: 'Launcher',
    defaultName: "Launcher",
    defaultSubpath: "launchers",
  }))

  plop.setGenerator('Launcher Provider', {
    description: 'Create a Launcher Provider',
    prompts: prompts(
      NameInputPrompt({ default: "Provider", postfix: 'Provider' }),
      SubpathInputPrompt({ default: "launchers" }),
    ),
    actions: actions(
      addFolderAction(
        'templates/Provider/*.hbs',
        'src/{{pascalCase subpath}}/{{pascalCase name}}',
      ),
    ),
  })

  plop.setGenerator('Locale', {
    description: 'Create a Locale',
    prompts: prompts(),
    actions: actions(
      addFolderAction(
        'templates/Locale/*.hbs',
        'src/locale',
      ),
    ),
  })

  plop.setGenerator('Locale Language', {
    description: 'Create a Locale Language',
    prompts: prompts(
      NameInputPrompt(),
    ),
    actions: actions(
      addFolderAction(
        'templates/Locale/i18n/*.hbs',
        'src/locale/i18n',
      ),
      injectModuleImportExportAction(
        'src/locale/i18n/index.ts',
        `import {{constantCase name}} from './{{dashCase name}}.json'`,
        `  '{{dashCase name}}': {{constantCase name}},`,
        true,
      ),
      addFolderAction(
        'templates/Locale/l10n/*.hbs',
        'src/locale/l10n',
      ),
      injectModuleImportExportAction(
        'src/locale/l10n/index.ts',
        `import {{constantCase name}} from './{{dashCase name}}.json'`,
        `  '{{dashCase name}}': {{constantCase name}},`,
        true,
      ),
    ),
  })

  plop.setGenerator('Store', {
    description: 'Create a Store',
    prompts: prompts(),
    actions: actions(
      addFolderAction(
        'templates/Store/*.hbs',
        'src/store',
      ),
    ),
  })

  plop.setGenerator('Store Slice', {
    description: 'Create a Store Slice',
    prompts: prompts(
      NameInputPrompt({ default: "Store", postfix: 'Store' }),
    ),
    actions: actions(
      addFolderAction(
        'templates/Store/StoreSlice/*.hbs',
        'src/store/{{pascalCase name}}',
      ),
      injectModuleExportAction(
        'src/store/index.ts',
        `export * from './{{pascalCase name}}'`,
      ),
    ),
  })

  plop.setGenerator('Api', {
    description: 'Create a Api',
    prompts: prompts(),
    actions: actions(
      addFolderAction(
        'templates/Api/*.hbs',
        'src/api',
      ),
    ),
  })

  plop.setGenerator('Api Slice', {
    description: 'Create a Api Slice',
    prompts: prompts(
      NameInputPrompt({ default: "Api", postfix: 'Api' }),
    ),
    actions: actions(
      addFolderAction(
        'templates/Api/ApiSlice/*.hbs',
        'src/api/{{pascalCase name}}',
      ),
      injectModuleExportAction(
        'src/api/index.ts',
        `export * from './{{pascalCase name}}'`,
      ),
    ),
  })
}
