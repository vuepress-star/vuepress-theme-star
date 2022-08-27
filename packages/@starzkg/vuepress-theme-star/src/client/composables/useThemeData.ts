import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/client'
import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/client'
import type { StarThemeData } from '../../shared/index.js'

export const useThemeData = (): ThemeDataRef<StarThemeData> =>
  _useThemeData<StarThemeData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<StarThemeData> =>
  _useThemeLocaleData<StarThemeData>()
