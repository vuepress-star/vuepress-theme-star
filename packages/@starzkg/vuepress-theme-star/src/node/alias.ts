import type { App } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'

/**
 * use alias to make all components replaceable
 * @see https://vuepress.github.io/reference/plugin-api.html#alias
 * @param app
 */
export const resolveAlias = (app: App): Record<string, string> => {
  return Object.fromEntries([
    ...fs
      .readdirSync(path.resolve(__dirname, '../client/components'))
      .filter((file) => file.endsWith('.vue'))
      .map((file) => [
        `@theme/${file}`,
        path.resolve(__dirname, '../client/components', file),
      ]),
    ...fs
      .readdirSync(path.resolve(__dirname, '../client/icons'))
      .filter((file) => file.endsWith('.vue'))
      .map((file) => [
        `@icon/${file}`,
        path.resolve(__dirname, '../client/icons', file),
      ]),
  ])
}
