import { archive as archiveRaw } from '@internal/archive'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Archive } from '../../shared'

declare const __VUE_HMR_RUNTIME__: Record<string, any>

export type ArchivesRef<T extends Archive[] = Archive[]> = Ref<T>

export const archives: ArchivesRef = ref(archiveRaw)

export const useArchive = <T extends Archive[] = Archive[]>(): ArchivesRef<T> =>
  archives as ArchivesRef<T>

if (import.meta.webpackHot || import.meta.hot) {
  __VUE_HMR_RUNTIME__.updateArchive = (data: Archive[]) => {
    archives.value = data
  }
}
