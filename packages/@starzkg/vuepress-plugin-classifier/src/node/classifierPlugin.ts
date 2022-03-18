import { Plugin } from '@vuepress/core'

export interface ClassifierPluginOptions {
  directories: string
  frontmatters: string
  datetime: string
}

export const classifierPlugin =
  (options: ClassifierPluginOptions): Plugin =>
  (_) => {
    return {}
  }
