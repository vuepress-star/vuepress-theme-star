import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useThemeData } from './useThemeData'

export const useIconPrefix = (): ComputedRef<string> =>
  computed(() => useThemeData().value.iconPrefix)
