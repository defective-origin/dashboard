import fs from 'fs'
import path from 'path'
import Tool from './generator.tool.js'

export const InjectAction = ({ place, target, template, abortOnFail = false, data }) => ({
  type: 'append',
  path: target,
  pattern: `/* INJECT_${place}_PLACE */`,
  template,
  abortOnFail,
  data
})

export const MODULE_INJECT_TEMPLATES = {
  common: {
    IMPORT: `import * from '{FILE_PATH}'`,
    EXPORT: `export * from '{FILE_PATH}'`,
    DEFAULT_EXPORT: `export { default } from '{FILE_PATH}'`,
  },
  partial: {
    IMPORT: `import {{snakeCase name}} from '{FILE_PATH}'`,
    EXPORT: `  {{snakeCase name}},`,
  },
}

/**
 * Inject file imports, exports in module file.
 * @param {'IMPORT' | 'EXPORT' | 'DEFAULT_EXPORT'} place - Place for injection.
 * @param {'common' | 'partial'} type - Place for injection.
 * @param {string} target - Path for file to inject template.
 */
export const ModuleInjectAction = ({place, type, target, filePath, removeExt = ['.tsx?'], data}) => {
  const template = MODULE_INJECT_TEMPLATES[type][place]
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
  imports = [],
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
    imports?.map((filePath) => ModuleInjectAction({ ...injectOptions, place: 'IMPORT', filePath })),
    exports?.map((filePath) => ModuleInjectAction({ ...injectOptions, place: 'EXPORT', filePath })),
    defaultExport && ModuleInjectAction({ ...injectOptions, place: 'DEFAULT_EXPORT', filePath: defaultExport }),
  ]
}

export const FileAction = ({
  target,
  template,
  skipIfExists,
  abortOnFail,
  module, // { target, type, import, export, defaultExport }
  indexName,
  data,
}) => {
  const filePath = module?.target && `./${path.relative(module.target, target)}`
  const imports = module?.import && [filePath]
  const exports = module?.export && [filePath]
  const defaultExport = module?.defaultExport && [filePath]

  return [
    BaseFileAction({ target, template, skipIfExists, abortOnFail }),
    module && ModuleFileAction({
      target: module.target,
      type: module.type,
      imports,
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
  files = [],
  ext = '.hbs',
  skipIfExists,
  isSubmodule = false,
  abortOnFail = false,
  module, // { type, imports, notExports, defaultExport }
  indexName,
  data,
}) => {
  const folderFiles = fs.readdirSync(`generator/${template}`)
    // take only necessary files
    .filter((fileName) => Tool.hasMatch(files, fileName))
    // remove template extension
    .map((fileName) => fileName.replace(ext, ''))
    // add path relative to folder
    .map((fileName) => `./${fileName}`)
  const imports = module?.imports && folderFiles.filter((fileName) => Tool.hasMatch(module?.imports, fileName))
  const exports = module?.notExports && folderFiles.filter((fileName) => !Tool.hasMatch(module?.notExports, fileName))
  const defaultExport = module?.defaultExport && folderFiles.find((fileName) => Tool.isMatch(module?.defaultExport, fileName))
  const filePatterns = files.length ? `*{${files.join(',')}}*` : '*'

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
      imports,
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
