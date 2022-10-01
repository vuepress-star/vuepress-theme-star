import type { App } from '@vuepress/core'
import type { MarkdownEnhanceOptions } from '../../shared/index.js'
import {
  resolveAlignContainerOptions,
  resolveCodeDemoContainerOptions,
  resolveComponentContainerOptions,
  resolveContainerPluginOptions,
  resolveDetailsContainerOptions,
  resolveVPreContainerOptions,
  useContainerPlugin,
} from './containers/index.js'

export const usePlugins = (
  app: App,
  markdownOptions: MarkdownEnhanceOptions
): void => {
  // container
  if (markdownOptions.container) {
    // default
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'default')
    )
    // tip
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'tip')
    )
    // note
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'note')
    )
    // primary
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'primary')
    )
    // info
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'info')
    )
    // warning
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'warning')
    )
    // danger
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'danger')
    )
    // details
    useContainerPlugin(app, resolveDetailsContainerOptions(markdownOptions))
  }

  // v-pre
  if (markdownOptions.vPre) {
    useContainerPlugin(app, resolveVPreContainerOptions())
  }

  // align
  if (markdownOptions.align) {
    // left
    useContainerPlugin(app, resolveAlignContainerOptions('left'))
    // center
    useContainerPlugin(app, resolveAlignContainerOptions('center'))
    // right
    useContainerPlugin(app, resolveAlignContainerOptions('right'))
    // justify
    useContainerPlugin(app, resolveAlignContainerOptions('justify'))
  }

  // demo
  if (markdownOptions.codeDemo) {
    useContainerPlugin(app, resolveCodeDemoContainerOptions())
    useContainerPlugin(app, resolveCodeDemoContainerOptions('vue'))
    useContainerPlugin(app, resolveCodeDemoContainerOptions('react'))
  }

  // component
  useContainerPlugin(app, resolveComponentContainerOptions('code-group'))
  useContainerPlugin(app, resolveComponentContainerOptions('code-group-item'))
}
