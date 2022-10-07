import type { App } from '@vuepress/core'
import type { ContainerType, MarkdownOptions } from '../../shared/index.js'
import { ContainerTypeArray } from '../../shared/index.js'
import {
  resolveAlignContainerOptions,
  resolveCodeDemoContainerOptions,
  resolveComponentContainerOptions,
  resolveContainerPluginOptions,
  resolveDetailsContainerOptions,
  resolveVPreContainerOptions,
  useContainerPlugin,
} from './container/index.js'
import { useExternalLinkIconPlugin } from './external-link-icon/index.js'

export const usePlugins = (
  app: App,
  markdownOptions: MarkdownOptions
): void => {
  // container
  if (markdownOptions.container) {
    for (const containerTypeKey in ContainerTypeArray) {
      let enable = false
      if (typeof markdownOptions.container === 'object') {
        const container = markdownOptions.container
        enable = container[containerTypeKey]
      } else {
        enable = markdownOptions.container
      }
      if (enable) {
        useContainerPlugin(
          app,
          resolveContainerPluginOptions(
            markdownOptions,
            containerTypeKey as ContainerType
          )
        )
      }
    }
  }

  if (markdownOptions.details) {
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

  // external-link-icon
  useExternalLinkIconPlugin(
    app,
    typeof markdownOptions.externalLinkIcon === 'object'
      ? markdownOptions.externalLinkIcon
      : {}
  )
}
