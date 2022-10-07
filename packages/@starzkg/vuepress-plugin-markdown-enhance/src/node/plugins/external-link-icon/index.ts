import type { App } from '@vuepress/core'
import type { ExternalLinkIconPluginOptions } from '@vuepress/plugin-external-link-icon'
import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'

export const useExternalLinkIconPlugin = (
  app: App,
  options: ExternalLinkIconPluginOptions
): void => {
  app.use(externalLinkIconPlugin(options))
}
