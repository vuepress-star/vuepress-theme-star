import { ThemeData } from '@vuepress/plugin-theme-data'
import { PageInfoOptions } from './options'
export interface CommentPluginThemeData extends ThemeData {
  plugins?: {
    comment?: PageInfoOptions | false
  }
}