import fs from 'fs'
import path from 'path'

export function importFolder<T = any>(folderPath: string): Promise<T[]> {
  const folder = path.resolve(__dirname, folderPath)
  const modules = fs.readdirSync(folder)
    .map((file) => {
      const innerFile = path.join(folder, file)
      if (file.includes('.ts'))  {
        return import(innerFile) as Promise<T>
      }
      
      const innerFolder = path.join(folder, file, 'index.ts')
      if (fs.existsSync(innerFolder)) {
        return import(innerFile) as Promise<T>
      }

      return null
    }).filter(Boolean)

  return Promise.all(modules)
}
