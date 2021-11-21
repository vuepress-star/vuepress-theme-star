import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type InteractionEffectPluginOptions = Record<never, never>

export const interactionEffectPlugin: Plugin<InteractionEffectPluginOptions> = (
  _,
  app
) => {
  return {
    name: '@starzkg/vuepress-plugin-interaction-effect',

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/CursorEffects.vue'
    ),
  }
}