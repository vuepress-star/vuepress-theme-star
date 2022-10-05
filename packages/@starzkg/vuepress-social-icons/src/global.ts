import type { App } from 'vue'
import * as icons from './components/index.js'

export interface InstallOptions {
  /** @default `SocialIcon` */
  prefix?: string
}
export default (
  app: App,
  { prefix = 'SocialIcon' }: InstallOptions = {}
): void => {
  for (const [key, component] of Object.entries(icons)) {
    app.component(prefix + key, component)
  }
}

export { icons }
export * from './components/index.js'
