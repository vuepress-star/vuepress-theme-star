import type { StarThemeLocaleData } from '../../shared/index.js'
import { en } from './en.js'
import { ru } from './ru.js'
import { zh } from './zh.js'

export { en } from './en.js'
export { ru } from './ru.js'
export { zh } from './zh.js'

export default {
  en,
  ru,
  zh,
} as Record<string, StarThemeLocaleData>
