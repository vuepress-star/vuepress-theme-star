import type { ContainerPluginOptions } from '@vuepress/plugin-container'

export const resolveComponentContainerOptions = (
  name: string
): ContainerPluginOptions => {
  return {
    type: name,
    before: (info) => `<${name} ${info}>\n`,
    after: () => `\n</${name}>\n`,
  }
}
