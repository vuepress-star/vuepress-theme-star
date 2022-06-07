import type { ContainerPluginOptions } from '@vuepress/plugin-container'

export const resolveVPreContainerOptions = (): ContainerPluginOptions => {
  return {
    type: 'v-pre',
    before: () => `<div v-pre>\n`,
    after: () => `\n</div>\n`,
  }
}
