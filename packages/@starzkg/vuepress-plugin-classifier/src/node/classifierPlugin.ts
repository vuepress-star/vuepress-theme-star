import { Plugin } from '@vuepress/core'

export interface ClassifierPluginOptions {
  directories: string
  frontmatters: string
  datetime: string
}

export const classifierPlugin: Plugin<ClassifierPluginOptions> = (
  options,
  _
) => {
  return {}
}
