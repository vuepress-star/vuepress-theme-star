import type { LocaleConfig } from '@vuepress/shared'
import type { FeedOptions } from 'feed'
import type { FeedFilter } from './filter.js'
import type { FeedGetter } from './getter.js'
import type { FeedSorter } from './sorter.js'

export interface FeedLocaleData {
  /**
   * Whether to output Atom syntax files.
   *
   * 是否启用 Atom 格式输出。
   *
   * @default false
   */
  atom?: boolean | string

  /**
   * Whether to output JSON syntax files.
   *
   * 是否启用 JSON 格式输出。
   *
   * @default false
   */
  json?: boolean | string

  /**
   * Whether to output RSS syntax files.
   *
   * 是否启用 RSS 格式输出。
   *
   * @default false
   */
  rss?: boolean | string

  /**
   * options for feed
   */
  options?: Partial<FeedOptions>

  /**
   * A large image/icon of the feed, probably used as banner.
   *
   * 一个大的图片，用作 feed 展示。
   */
  image?: string

  /**
   * A small icon of the feed, probably used as favicon.
   *
   * 一个小的图标，显示在订阅列表中。
   */
  icon?: string

  /**
   * Max items outputed
   *
   * 输出的最大条目数量
   *
   * @default 100
   */
  count?: number

  /**
   * Custom component or element which needs to be removed
   *
   * 需要移除的自定义组件或元素
   *
   * @default ['ExternalLinkIcon']
   */
  customElements?: string[]

  /**
   * A custom filter funciton, used to filter feed items.
   *
   * Feed 项目过滤器
   */
  filter?: FeedFilter

  /**
   * A custom sort function, used to sort feed items.
   *
   * Feed 项目排序器
   */
  sorter?: FeedSorter

  /**
   * Feed generation controller
   *
   * @description The plugin is providing a resonable getter by default, if you want full control of feed generating, you can set this field.
   *
   * Feed 生成控制器
   *
   * @description 插件已经在默认情况下提供了合理的获取器，如果你需要完全控制 Feed 生成，你可以设置此项。
   */
  getter?: FeedGetter
}

export declare type FeedLocaleConfig = LocaleConfig<FeedLocaleData>

export declare type FeedPluginOptions = FeedLocaleData & {
  /**
   * Deploy hostname
   *
   * 部署的域名
   */
  hostname: string

  /**
   *  Locales for feed
   *  */
  locales?: FeedLocaleConfig
}
