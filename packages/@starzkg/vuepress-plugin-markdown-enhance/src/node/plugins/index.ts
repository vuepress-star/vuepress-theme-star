import type { App } from '@vuepress/core'
import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import type { MarkdownEnhanceOptions } from '../../shared'
import { codeDemoRender } from '../markdown-it'
import { resolveContainerPluginOptions, useContainerPlugin } from './container'

export const usePlugins = (
  app: App,
  markdownOptions: MarkdownEnhanceOptions
): void => {
  if (markdownOptions.container) {
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'info')
    )
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'tip')
    )
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'note')
    )
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'warning')
    )
    useContainerPlugin(
      app,
      resolveContainerPluginOptions(markdownOptions, 'danger')
    )

    useContainerPlugin(app, {
      type: 'details',
      before: (info) =>
        `<details class="custom-container details">${
          info ? `<summary>${info}</summary>` : ''
        }\n`,
      after: () => '</details>\n',
    })

    useContainerPlugin(app, {
      type: 'code-group',
      before: () => `<CodeGroup>\n`,
      after: () => '</CodeGroup>\n',
    })
    useContainerPlugin(app, {
      type: 'code-group-item',
      before: (info) => `<CodeGroupItem title="${info}">\n`,
      after: () => '</CodeGroupItem>\n',
    })
  }

  if (markdownOptions.align) {
    ;['left', 'center', 'right', 'justify'].forEach((type) =>
      useContainerPlugin(app, { type } as ContainerPluginOptions)
    )
  }

  if (markdownOptions.demo) {
    useContainerPlugin(app, {
      type: 'demo',
      render: codeDemoRender,
    })
  }
}
