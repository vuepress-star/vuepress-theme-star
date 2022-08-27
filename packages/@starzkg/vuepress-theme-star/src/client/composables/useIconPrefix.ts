import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useThemeData } from './useThemeData.js'

export const useIconPrefix = (): ComputedRef<string> =>
  computed(() => useThemeData().value.iconPrefix || 'icon-')
