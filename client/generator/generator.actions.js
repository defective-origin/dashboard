import path from 'path'

export const templateFolder = path => `templates/${path}`

/**
 * Inject file exports in module file.
 * @param {string} place - Place for injection.
 * @param {string} target - Path for file to inject template.
 * @param {string} template - Text to inject
 */
export const InjectAction = ({ target, template, place }) => ({
  type: 'append',
  path: target,
  pattern: `/* INJECT_${place}_PLACE */`,
  template: templateFolder(template),
  abortOnFail: false,
})

export const FileAction = ({ target, template, isExported, injects = {} }) => [
  {
    type: 'add',
    path: target,
    templateFile: templateFolder(template),
    skipIfExists: true,
    abortOnFail: false,
  },
  Object.entries(injects).map(([place, templates]) =>
    templates.map(template => InjectAction({ target, place, template })),
  ),
  isExported && ModuleFile(target),
]

export const ModuleFile = (exportFile, removeExt = ['.tsx?']) => {
  const fileName = path.basename(exportFile).replace(new RegExp(removeExt.join('|')), '')
  const inject = path.extname(exportFile) === '.json'
    ? `export { default as {{snakeCase name}} } from './${fileName}'`
    : `export * from './${fileName}'`

  return FileAction({
    target: `${path.dirname(exportFile)}/index.ts`,
    template: templateFolder('Module/index.hbs'),
    injects: { EXPORT: [inject] },
  })
}

export const FolderAction = ({ target, template, isExported, ignore = [] }) => {
  const folder = templateFolder(template)

  return [
    {
      type: 'addMany',
      abortOnFail: false,
      skipIfExists: true,
      destination: target,
      base: folder,
      templateFiles: [
        `${folder}/**/*.hbs`,
        ...ignore.filter(Boolean).map(part => `!${folder}/**/*${part}*`),
      ],
    },
    isExported && ModuleFile(target),
  ]
}

export default {
  Inject: InjectAction,
  File: FileAction,
  Folder: FolderAction,
}
