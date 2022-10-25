import type { App } from '@vuepress/core'
import { fs, getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

/**
 * use alias to make all components replaceable
 * @see https://vuepress.github.io/reference/plugin-api.html#alias
 * @param app
 */
export const alias = (app: App): Record<string, string> => {
  return Object.fromEntries([
    ...fs
      .readdirSync(path.resolve(__dirname, '../client'))
      .filter(
        (file) =>
          fs
            .statSync(path.resolve(__dirname, '../client', file))
            .isDirectory() &&
          fs.existsSync(path.resolve(__dirname, '../client', file, 'index.js'))
      )
      .map((file) => [
        `@theme/${file}`,
        path.resolve(__dirname, '../client', file, 'index.js'),
      ]),
  ])
}
