import { addCustomElement } from '@starzkg/vuepress-star-shared'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { Plugin } from '@vuepress/core'
import { getDirname, path } from '@vuepress/utils'
import { mergeConfig } from 'vite'
import { abbr } from '../markdown-it/plugins/abbr.js'
import { attrs } from '../markdown-it/plugins/attrs.js'
import { cjkBreaks } from '../markdown-it/plugins/cjk-breaks.js'
import { codeEnhance } from '../markdown-it/plugins/code/index.js'
import { colorModel } from '../markdown-it/plugins/color-model.js'
import { deflist } from '../markdown-it/plugins/deflist.js'
import { emoji } from '../markdown-it/plugins/emoji.js'
import { footnote } from '../markdown-it/plugins/footnote.js'
import { forInline } from '../markdown-it/plugins/for-inline.js'
import { _import } from '../markdown-it/plugins/import/index.js'
import { include } from '../markdown-it/plugins/include.js'
import { ins } from '../markdown-it/plugins/ins.js'
import { katex } from '../markdown-it/plugins/katex.js'
import { mark } from '../markdown-it/plugins/mark.js'
import { mathjax } from '../markdown-it/plugins/mathjax.js'
import { sub } from '../markdown-it/plugins/sub.js'
import { sup } from '../markdown-it/plugins/sup.js'
import { taskList } from '../markdown-it/plugins/task-list.js'
import { tex } from '../markdown-it/plugins/tex.js'
import type { MarkdownFavor, MarkdownOptions } from '../shared/index.js'
import { logger } from './logger.js'
import { usePlugins } from './plugins/index.js'
import { assignDefaultMarkdownOptions, MATHML_TAGS } from './utils/index.js'

const __dirname = getDirname(import.meta.url)

export declare type MarkdownEnhancePluginOptions =
  | MarkdownOptions
  | MarkdownFavor
  | boolean

export const markdownEnhancePlugin =
  (options: MarkdownEnhancePluginOptions = true): Plugin =>
  (app) => {
    if (app.env.isDebug) {
      logger.info(`source Options:\n${JSON.stringify(options, null, '\t')}`)
    }

    const plugin = {
      name: '@starzkg/vuepress-plugin-markdown-enhance',
    }

    if (!options) {
      return plugin
    }

    const markdownOptions = assignDefaultMarkdownOptions(options)

    if (app.env.isDebug) {
      logger.info(
        `merged Options:\n${JSON.stringify(markdownOptions, null, '\t')}`
      )
    }

    usePlugins(app, markdownOptions)

    const codeEnhanceOptions = markdownOptions.codeEnhance || {}

    return {
      ...plugin,

      define: (): Record<string, unknown> => ({
        ...Object.keys(markdownOptions).reduce((newData, key) => {
          const newKey =
            'MARKDOWN_ENHANCE_' + key.replace(/([A-Z])/g, '_$1').toUpperCase()
          newData[newKey] = markdownOptions[key]
          return newData
        }, {}),
        ...Object.keys(codeEnhanceOptions).reduce((newData, key) => {
          const newKey =
            'MARKDOWN_ENHANCE_' + key.replace(/([A-Z])/g, '_$1').toUpperCase()
          newData[newKey] = codeEnhanceOptions[key]
          return newData
        }, {}),
      }),

      clientConfigFile: path.resolve(__dirname, '../client/config.js'),

      extendsMarkdownOptions: (mdOptions): void => {
        Object.assign(mdOptions, {
          ...mdOptions,
          ...markdownOptions,
        })
      },

      extendsMarkdown: (markdownIt): void => {
        if (markdownOptions.abbr) markdownIt.use(abbr)
        if (markdownOptions.attrs) {
          markdownIt.use(
            attrs,
            typeof markdownOptions.attrs === 'object'
              ? markdownOptions.attrs
              : {}
          )
        }
        if (markdownOptions.cjkBreaks) markdownIt.use(cjkBreaks)
        if (markdownOptions.codeEnhance) markdownIt.use(codeEnhance)
        if (markdownOptions.colorModel) markdownIt.use(colorModel)
        if (markdownOptions.deflist) markdownIt.use(deflist)
        if (markdownOptions.emoji) markdownIt.use(emoji)
        if (markdownOptions.footnote) markdownIt.use(footnote)
        if (markdownOptions.forInline) {
          markdownIt.use(
            forInline,
            typeof markdownOptions.forInline === 'object'
              ? markdownOptions.forInline
              : {}
          )
        }
        if (markdownOptions.import) markdownIt.use(_import)
        if (markdownOptions.include) markdownIt.use(include)
        if (markdownOptions.ins) markdownIt.use(ins)
        if (markdownOptions.mark) markdownIt.use(mark)
        if (markdownOptions.sup) markdownIt.use(sup)
        if (markdownOptions.sub) markdownIt.use(sub)
        if (markdownOptions.tasklist) {
          markdownIt.use(taskList, [
            typeof markdownOptions.tasklist === 'object'
              ? markdownOptions.tasklist
              : {},
          ])
        }
        if (markdownOptions.tex) {
          markdownIt.use(tex)
          if (markdownOptions.tex === 'katex' || markdownOptions.tex === true) {
            markdownIt.use(
              katex,
              typeof markdownOptions.katex === 'object'
                ? markdownOptions.katex
                : {}
            )
          } else if (markdownOptions.mathjax) {
            markdownIt.use(
              mathjax,
              typeof markdownOptions.mathjax === 'object'
                ? markdownOptions.mathjax
                : {}
            )
          }
        }
      },

      extendsBundlerOptions: (config, app) => {
        if (markdownOptions.katex) {
          addCustomElement(app, config, MATHML_TAGS)
        } else if (markdownOptions.mathjax) {
          addCustomElement(app, config, /^mjx-/)
        }

        if (app.options.bundler.name.endsWith('vite')) {
          const bundlerConfig = <ViteBundlerOptions>config
          bundlerConfig.viteOptions = mergeConfig(
            bundlerConfig.viteOptions || {},
            {
              optimizeDeps: {
                include: [
                  ...(codeEnhanceOptions.chart ? ['chart.js/auto'] : []),
                  ...(codeEnhanceOptions.flowchart
                    ? ['flowchart.js/src/flowchart.parse.js']
                    : []),
                  ...(codeEnhanceOptions.mermaid ? ['mermaid'] : []),
                  ...(codeEnhanceOptions.markmap
                    ? ['markmap-lib', 'markmap-view']
                    : []),
                  ...(codeEnhanceOptions.reveal
                    ? [
                        'reveal.js/dist/reveal.esm.js',
                        'reveal.js/plugin/markdown/markdown.esm.js',
                        ...(typeof codeEnhanceOptions.reveal === 'object'
                          ? codeEnhanceOptions.reveal.plugins || []
                          : []
                        ).map(
                          (plugin) =>
                            `reveal.js/plugin/${plugin}/${plugin}.esm.js`
                        ),
                      ]
                    : []),
                ],
              },
              ssr: {
                external: [
                  ...(codeEnhanceOptions.chart ? ['chart.js'] : []),
                  ...(codeEnhanceOptions.echarts ? ['echarts'] : []),
                  ...(codeEnhanceOptions.flowchart ? ['flowchart.js'] : []),
                  ...(codeEnhanceOptions.mermaid ? ['mermaid'] : []),
                  ...(codeEnhanceOptions.markmap
                    ? ['markmap-lib', 'markmap-view']
                    : []),
                  ...(codeEnhanceOptions.reveal ? ['reveal.js'] : []),
                ],
              },
            }
          )
        }
      },
    }
  }
