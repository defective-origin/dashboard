import fs from 'fs'
import path from 'path'
import tools from './generator.tools.js'

export const InjectAction = ({ place, target, template, abortOnFail = false, data }) => ({
  type: 'append',
  path: target,
  pattern: `/* INJECT_${place}_PLACE */`,
  template,
  abortOnFail,
  data,
})

export const MODULE_INJECT_TEMPLATES = {
  jsx: {
    EXPORT: ['export * from \'{FILE_PATH}\''],
    DEFAULT_EXPORT: [
      'export { default } from \'{FILE_PATH}\'',
      '// export default React.lazy(() => import(\'{FILE_PATH}\'))',
    ],
  },
  common: {
    EXPORT: ['export * from \'{FILE_PATH}\''],
    DEFAULT_EXPORT: ['export { default } from \'{FILE_PATH}\''],
  },
  json: {
    EXPORT: ['export { default as {{snakeCase name}} } from \'{FILE_PATH}\''],
  },
}

/**
 * Inject file exports in module file.
 * @param {'EXPORT' | 'DEFAULT_EXPORT'} place - Place for injection.
 * @param {'common' | 'json' | 'jsx'} type - Pattern to fill.
 * @param {string} target - Path for file to inject template.
 */
export const ModuleInjectAction = ({place, type, target, filePath, removeExt = ['.tsx?'], data}) => {
  const template = MODULE_INJECT_TEMPLATES[type][place].join('\n')
    .replace('{FILE_PATH}', filePath)
    .replace(new RegExp(removeExt.join('|')), '')

  return InjectAction({ place, target, template, data })
}

export const BaseFileAction = ({ target, template, skipIfExists = true, abortOnFail = false, data }) => ({
  type: 'add',
  path: target,
  templateFile: template,
  skipIfExists,
  abortOnFail,
  data,
})

export const ModuleFileAction = ({
  target: folderTarget,
  type = 'common',
  exports = [],
  defaultExport,
  skipIfExists,
  abortOnFail,
  fileName = 'index.ts',
  data,
}) => {
  const template = `templates/Module/${type}.${fileName}.hbs`
  const target = `${folderTarget}/${fileName}`
  const injectOptions = { type, target, data }

  return [
    BaseFileAction({ target, template, skipIfExists, abortOnFail, data }),
    exports?.map(filePath => ModuleInjectAction({ ...injectOptions, place: 'EXPORT', filePath })),
    defaultExport && ModuleInjectAction({ ...injectOptions, place: 'DEFAULT_EXPORT', filePath: defaultExport }),
  ]
}

export const FileAction = ({
  target,
  template,
  skipIfExists,
  abortOnFail,
  module, // { target, type, export, defaultExport }
  indexName,
  data,
}) => {
  const filePath = module?.target && `./${path.relative(module.target, target)}`
  const exports = module?.export && [filePath]
  const defaultExport = module?.defaultExport && [filePath]

  return [
    BaseFileAction({ target, template, skipIfExists, abortOnFail }),
    module && ModuleFileAction({
      target: module.target,
      type: module.type,
      exports,
      defaultExport,
      skipIfExists,
      abortOnFail,
      fileName: indexName,
      data,
    }),
  ]
}

export const FolderAction = ({
  target,
  template,
  files = [], // ['file_postfix_1', 'file_postfix_2', undefined, false, null, 0]
  ext = '.hbs',
  skipIfExists,
  isSubmodule = false,
  abortOnFail = false,
  module, // { type, notExports, defaultExport }
  indexName,
  data,
}) => {
  const clearFiles = files.filter(Boolean)
  const folderFiles = fs.readdirSync(`generator/${template}`)
    // take only necessary files
    .filter(fileName => tools.hasMatch(clearFiles, fileName))
    // remove template extension
    .map(fileName => fileName.replace(ext, ''))
    // add path relative to folder
    .map(fileName => `./${fileName}`)
  const exports = module?.notExports && folderFiles.filter(fileName => !tools.hasMatch(module?.notExports, fileName))
  const defaultExport = module?.defaultExport && folderFiles.find(fileName => tools.isMatch(module?.defaultExport, fileName))
  const filePatterns = clearFiles.length ? `*{${clearFiles.join(',')}}*` : '*'

  return [
    {
      type: 'addMany',
      skipIfExists,
      abortOnFail,
      destination: target,
      templateFiles: `${template}/${filePatterns}${ext}`,
      base: template,
      globOptions: {
        braceExpansion: true,
      },
      data,
    },
    module && ModuleFileAction({
      target,
      type: module.type,
      exports,
      defaultExport,
      skipIfExists,
      abortOnFail,
      fileName: indexName,
      data,
    }),
    isSubmodule && ModuleFileAction({
      target: path.dirname(target),
      exports: [ `./${path.basename(target)}` ],
      skipIfExists,
      abortOnFail,
      fileName: indexName,
      data,
    }),
  ]
}

export default {
  Inject: InjectAction,
  ModuleInject: ModuleInjectAction,
  File: FileAction,
  ModuleFile: ModuleFileAction,
  Folder: FolderAction,
}
