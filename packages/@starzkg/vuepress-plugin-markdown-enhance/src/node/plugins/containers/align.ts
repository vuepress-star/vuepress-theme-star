import type { ContainerPluginOptions } from '@vuepress/plugin-container'

export const resolveAlignContainerOptions = (
  align: string
): ContainerPluginOptions => {
  return {
    type: align,
    before: () => `<div style="text-align: ${align}">\n`,
    after: () => `\n</div>\n`,
  }
}
