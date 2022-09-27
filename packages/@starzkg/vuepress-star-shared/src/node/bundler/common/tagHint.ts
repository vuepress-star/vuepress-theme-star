import { chalk } from '@vuepress/utils'
import { HTML_TAGS, SVG_TAGS } from '../../tags/index.js'

export const tagHint = (tag: string, isDebug = false): void => {
  if (
    isDebug &&
    !(HTML_TAGS + ',' + SVG_TAGS).split(',').includes(tag) &&
    tag === tag.toLowerCase() &&
    !tag.includes('-')
  ) {
    console.warn(
      chalk.yellow('warning: '),
      `${tag} is used and it’s not a standard tag or standard custom element name`
    )
  }
}
