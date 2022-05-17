import { fs, path } from '@vuepress/utils'

export const resolveAlias = (): Record<string, string> => {
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
