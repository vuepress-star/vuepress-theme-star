import { getLocales } from '@starzkg/vuepress-shared'
import type { App } from '@vuepress/core'
import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import containerPlugin from '@vuepress/plugin-container'
import type { LocaleConfig } from '@vuepress/shared'
import type { MarkdownContainerName, MarkdownEnhanceOptions } from '../shared'
import { i18n } from './i18n'
import { codeDemoRender, getDetailsRender } from './markdown-it'

export const usePlugins = (
  app: App,
  markdownOptions: MarkdownEnhanceOptions
): void => {
  const locales = getLocales({
    app,
    name: 'markdown-enhance',
    default: i18n,
    config: markdownOptions.locales,
  })

  const getContainerLocale = (
    key: MarkdownContainerName
  ): LocaleConfig<{
    defaultInfo: string
  }> =>
    Object.fromEntries(
      Object.keys(locales).map((path) => [
        path,
        { defaultInfo: locales[path][key] },
      ])
    )

  if (markdownOptions.customContainer || markdownOptions.enableAll) {
    const containers: MarkdownContainerName[] = [
      'info',
      'tip',
      'warning',
      'danger',
    ]

    containers.forEach((type) =>
      app.use(
        containerPlugin({
          type,
          locales: getContainerLocale(type),
        } as ContainerPluginOptions)
      )
    )

    app.use(
      containerPlugin({
        type: 'details',
        render: getDetailsRender(getContainerLocale('details')),
      } as ContainerPluginOptions)
    )
  }

  if (markdownOptions.align || markdownOptions.enableAll)
    ['left', 'center', 'right', 'justify'].forEach((type) =>
      app.use(containerPlugin({ type } as ContainerPluginOptions))
    )

  if (markdownOptions.demo || markdownOptions.enableAll)
    app.use(
      containerPlugin({
        type: 'demo',
        render: codeDemoRender,
      })
    )
}
